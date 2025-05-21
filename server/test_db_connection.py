from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError

# Replace this with your actual URI from Render
# DATABASE_URL = "postgresql+psycopg2://lil:secretpassword@fanfiction-db-vq9j.onrender.com:5432/fanfiction?sslmode=require"
DATABASE_URL="postgresql+psycopg2://fanfiction_db_user:srVlUQfXk2uKLBoDnBMWMnrxSJKT9lUJ@dpg-d0m9jlidbo4c73cl1tgg-a.frankfurt-postgres.render.com:5432/fanfiction_db?sslmode=require"

engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        print("✅ Connection successful:", result.scalar())
except OperationalError as e:
    print("❌ Connection failed:")
    print(e)
