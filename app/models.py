from app import db

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    recipes = db.relationship('Recipe', backref='category', lazy='dynamic')

    def __repr__(self):
        return '<Category {}>'.format(self.name)

class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), index=True, unique=True)
    recipes = db.relationship('Recipe', backref='unit', lazy='dynamic')

    def __repr__(self):
        return '<Unit {}>'.format(self.name)

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    recipes = db.relationship('Recipe', backref='ingredient', lazy='dynamic')

    def __repr__(self):
        return '<Ingredient {}>'.format(self.name)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    portions = db.Column(db.Integer)
    quantity = db.Column(db.Float)
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))

    def __repr__(self):
        return '<Recipe {}>'.format(self.name)

class Shopping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(16))
    item = db.Column(db.String(128))