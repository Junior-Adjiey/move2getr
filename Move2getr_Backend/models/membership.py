from sqlmodel import SQLModel, Field, Relationship

class GroupMembership(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_id: str = Field(foreign_key="account.user_id")
    group_id: str = Field(foreign_key="group.group_id")
