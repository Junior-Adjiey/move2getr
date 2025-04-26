from fastapi import WebSocket, WebSocketDisconnect, Depends
from fastapi.routing import APIRouter
from typing import Dict, List
from utils.token_utils import decode_access_token
from utils.crypto_utils import encrypt_message, decrypt_message
from models.account import Account
from models.message import Message
from db import SessionLocal, get_session  # ✅
from sqlmodel import Session, select
import json
from dependencies.auth_utils import get_current_user  # ✅


router = APIRouter()

# Active private connections
active_connections: Dict[str, WebSocket] = {}

# Active group connections
group_connections: Dict[str, List[tuple]] = {}

def get_current_user_from_token(token: str, session: Session) -> Account:
    user_id = decode_access_token(token)
    if user_id is None:
        raise Exception("Invalid token")
    
    user = session.exec(select(Account).where(Account.user_id == user_id)).first()
    if not user:
        raise Exception("User not found in database")
    
    return user

@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket, token: str):
    session = SessionLocal()
    print("🔵 Received token:", token)  # 👈 debug print
    try:
        current_user = get_current_user_from_token(token, session)
        print("🟢 Current user:", current_user.username)  # 👈 debug print
        await websocket.accept()
        active_connections[current_user.username] = websocket

        while True:
            data = await websocket.receive_text()
            try:
                data_json = json.loads(data)
                receiver_username = data_json.get("receiver")
                group_name = data_json.get("group")
                plain_message = data_json.get("message")

                encrypted_message = encrypt_message(plain_message)

                # Save the message in the database
                message_db = Message(
                    sender_username=current_user.username,
                    receiver_username=receiver_username,
                    content_encrypted=encrypted_message,
                    is_read=False,  # ✅ important
                    group_name=None  # (or the group name later for groups)
                )
                session.add(message_db)
                session.commit()


                # Private message
                if receiver_username and receiver_username in active_connections:
                    receiver_ws = active_connections[receiver_username]
                    await receiver_ws.send_text(json.dumps({
                        "sender": current_user.username,
                        "text": plain_message
                    }))
                # Group message
                elif group_name:
                    if group_name not in group_connections:
                        group_connections[group_name] = []
                    # Ensure user is added once
                    if not any(u == current_user.username for u, _ in group_connections[group_name]):
                        group_connections[group_name].append((current_user.username, websocket))
                    # Broadcast to group
                    for username, conn in group_connections[group_name]:
                        if conn != websocket:
                            await conn.send_text(f"[{group_name}] {current_user.username}: {plain_message}")
                else:
                    await websocket.send_text(f"❌ Receiver not found.")

            except Exception as e:
                print(f"WebSocket error: {e}")
                await websocket.send_text("Invalid message format. Use JSON {receiver/group, message}")

    except WebSocketDisconnect:
        if current_user.username in active_connections:
            del active_connections[current_user.username]
        for group, users in list(group_connections.items()):
            group_connections[group] = [(u, ws) for u, ws in users if u != current_user.username]
            if not group_connections[group]:  # if group is empty
                del group_connections[group]
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close(code=1008)


@router.get("/chats/unread-count")
def get_unread_messages_count(session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    count = session.exec(
        select(Message)
        .where(Message.receiver_username == current_user.username)
        .where(Message.is_read == False)
    ).count()

    return {"unread_messages": count}

@router.get("/messages/unread_count/{sender_username}")
def get_unread_count(sender_username: str, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    unread_count = session.exec(
        select(Message)
        .where(
            Message.sender_username == sender_username,
            Message.receiver_username == current_user.username,
            Message.is_read == False
        )
    ).all()
    
    return {"unread_count": len(unread_count)}

@router.post("/messages/mark_as_read/{sender_username}")
def mark_messages_as_read(sender_username: str, session: Session = Depends(get_session), current_user: Account = Depends(get_current_user)):
    messages = session.exec(
        select(Message)
        .where(
            Message.sender_username == sender_username,
            Message.receiver_username == current_user.username,
            Message.is_read == False
        )
    ).all()

    for message in messages:
        message.is_read = True

    session.commit()
    return {"status": "messages marked as read"}





