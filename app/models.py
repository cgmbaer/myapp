from app import db

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    quantity = db.Column(db.Integer)
    image_filename = db.Column(db.String(128))
    photo_filename = db.Column(db.String(128))
    description = db.Column(db.Text)
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='recipe_ingredient_id', lazy='dynamic')
    recipe_tags = db.relationship(
        'Recipe_Tag', backref='recipe', lazy='dynamic')

class Unit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16), index=True, unique=True)
    factor = db.Column(db.Float)
    group =  db.Column(db.String(128))
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='unit', lazy='dynamic')

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    recipe_ingredients = db.relationship(
        'Recipe_Ingredient', backref='ingredient', lazy='dynamic')

class Recipe_Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer)
    quantity = db.Column(db.Float)
    group =  db.Column(db.String(128))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'))
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'))

class Shopping(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String(16))
    item = db.Column(db.String(128))
    ingredient_id = db.Column(db.Integer)

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    recipe_tags = db.relationship(
        'Recipe_Tag', backref='tag', lazy='dynamic')

class Recipe_Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    ingredients = db.relationship(
        'Ingredient', backref='category', lazy='dynamic')