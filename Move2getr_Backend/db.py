from sqlmodel import create_engine, Session

DATABASE_URL = "postgresql://postgres:junior2005@localhost:5432/move2getr"

engine = create_engine(DATABASE_URL, echo=True)

# Create a session factory (NOT a session object directly)
def SessionLocal():
    return Session(engine)

# ✅ Dependency
def get_session():
    with Session(engine) as session:
        yield session



