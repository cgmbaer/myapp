from app import db


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    quantity = db.Column(db.Integer)
    has_image = db.Column(db.Boolean)
    has_photo = db.Column(db.Boolean)
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='recipe', lazy='dynamic')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "quantity": self.quantity,
            "has_image": self.has_image,
            "has_photo": self.has_photo
        }

    def __repr__(self):
        return '<Recipe {}>'.format(self.name)


class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), index=True, unique=True)
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='unit', lazy='dynamic')

    def __repr__(self):
        return '<Unit {}>'.format(self.name)


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='ingredient', lazy='dynamic')

    def __repr__(self):
        return '<Ingredient {}>'.format(self.name)


class Recipe_Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Float)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'))

    def __repr__(self):
        return '<Recipe_Ingredient {}>'.format(self.id)


class Shopping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(16))
    item = db.Column(db.String(128))
