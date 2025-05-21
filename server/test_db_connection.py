from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

# Replace this with your actual URI from Render

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Connection successful:", result.scalar())
except OperationalError as e:
    print("❌ Connection failed:")
    print(e)
