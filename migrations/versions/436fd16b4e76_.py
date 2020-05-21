"""empty message

Revision ID: 436fd16b4e76
Revises: 110d6369082d
Create Date: 2020-05-20 17:37:48.673160

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '436fd16b4e76'
down_revision = '110d6369082d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('unit', sa.Column('factor', sa.Float(), nullable=True))
    op.add_column('unit', sa.Column('group', sa.String(length=128), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('unit', 'group')
    op.drop_column('unit', 'factor')
    # ### end Alembic commands ###