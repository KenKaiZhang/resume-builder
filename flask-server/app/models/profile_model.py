from typing import Optional
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db

class Profile(db.Model):
    id: so.Model[int] = so.mapped_column(primary_key=True)
    first: so.Model[str] = so.mapped_column(sa.String(140))
    middle: so.Model[str] = so.mapped_column(sa.String(140))
    last: so.Model[str] = so.mapped_column(sa.String(140))
    address: so.Model[str] = so.mapped_column(sa.String(140))
    phone: so.Model[str] = so.mapped_column(sa.String(140))
    email: so.Model[str] = so.mapped_column(sa.String(140))
    links: so.Model[str] = so.mapped_column(sa.String(140))
    objective: so.Model[str] = so.mapped_column(sa.String(140))
