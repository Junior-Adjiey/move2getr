from cryptography.fernet import Fernet

# In real production, load the secret key from a secure .env or vault
SECRET_KEY = Fernet.generate_key()  # For now, temporary random key
cipher_suite = Fernet(SECRET_KEY)

def encrypt_message(message: str) -> str:
    return cipher_suite.encrypt(message.encode()).decode()

def decrypt_message(token: str) -> str:
    return cipher_suite.decrypt(token.encode()).decode()
