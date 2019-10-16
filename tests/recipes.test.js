const app = require("../app");
const Recipe = require("../models/Recipe");
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const {
	applePie,
	bananaBread,
	poachedPear,
	someOtherRecipe,
	recipesTestData,
	recipes,
	dessertCatergory,
	breadCatergory
} = require("./recipesTestData");

describe("Recipes", () => {
	let mongoServer;
	beforeAll(async () => {
		try {
			mongoServer = new MongoMemoryServer();
			const mongoUri = await mongoServer.getConnectionString();

			mongoose.set("useNewUrlParser", true);
			mongoose.set("useFindAndModify", false);
			mongoose.set("useCreateIndex", true);
			mongoose.set("useUnifiedTopology", true);
			await mongoose.connect(mongoUri);
		} catch (err) {
			console.error(err);
		}
	});
	afterAll(async () => {
		await mongoose.disconnect();
		await mongoose.close();
		await mongoServer.stop();
	});

	beforeEach(async () => {
		// [applePie, bananaBread, poachedPear, someOtherRecipe];
		// await Recipe.create(recipes);
		await Recipe.create(recipesTestData);
	});

	afterEach(async () => {
		await Recipe.deleteMany();
	});

	describe("GET recipes", () => {
		it("should get all recipes", async () => {
			const expectedRecipes = recipesTestData;
			const { body: allRecipes } = await request(app)
				.get("/recipes")
				.expect(200);

			expect(expectedRecipes).toHaveLength(3);
			for (const recipe of allRecipes) {
				const hasRecipe = allRecipes.some(
					returnRecipe => returnRecipe.title === recipe.title
				);

				expect(hasRecipe).toBe(true);
			}
		});

		it("should be able to get one recipe by id", async () => {
			const expectedRecipe = recipes.applePie;
			const { body: allRecipes } = await request(app)
				.get("/recipes")
				.expect(200);

			const id = allRecipes[0]._id;
			const { body: actualRecipe } = await request(app)
				.get("/recipes/" + id)
				.expect(200);
			expect(actualRecipe).toMatchObject(expectedRecipe);
		});

		describe("should be able to query via catergories", () => {
			it("should only receive one recipe for /recipes?catergories=bread", async () => {
				const { body: allRecipes } = await request(app)
					.get("/recipes")
					.query({ catergories: "bread" })
					.expect(200);

				expect(allRecipes).toHaveLength(1);

				expect(allRecipes[0].catergories).toEqual(
					expect.arrayContaining(["bread"])
				);
			});

			it("should receive recipes with desserts for /recipes?catergories=dessert", async () => {
				const { body: allRecipes } = await request(app)
					.get("/recipes")
					.query({ catergories: "dessert" })
					.expect(200);

				expect(allRecipes).toHaveLength(2);

				expect(allRecipes[0].catergories).toEqual(
					expect.arrayContaining(["dessert"])
				);

				expect(allRecipes[1].catergories).toEqual(
					expect.arrayContaining(["dessert"])
				);
			});

			it("should receive 3 recipes for /recipes?catergories[]=dessert&catergories[]=vegetarian", async () => {
				const { body: allRecipes } = await request(app)
					.get("/recipes")
					.query({ catergories: ["dessert", "vegetarian"] })
					.expect(200);

				expect(allRecipes).toHaveLength(2);

				expect(allRecipes[1].catergories).toEqual(
					expect.arrayContaining(["dessert", "vegetarian"])
				);
			});
		});
	});

	describe("POST /recipes", () => {
		it("should be able to add a new recipe", async () => {
			const newRecipe = {
				title: "pancakes",
				ingredients: ["flour", "water", "sugar"],
				instructions: ["pray"]
			};
			const { body: allRecipes } = await request(app)
				.post("/recipes/new")
				.send(newRecipe)
				.expect(200);
			expect(allRecipes).toEqual(expect.objectContaining(newRecipe));
		});
	});

	describe("PATCH /recipes", () => {
		it("should be able to update a recipe", async () => {
			const { body: allRecipes } = await request(app).get("/recipes");

			const id = allRecipes[2]._id;

			const updatedRecipe = {
				instructions: ["boil sliced pears in sugar solution"]
			};

			const { body: actualRecipe } = await request(app)
				.patch("/recipes/" + id)
				.expect(200)
				.send(updatedRecipe);

			expect(actualRecipe).toEqual(expect.objectContaining(updatedRecipe));
		});
	});

	describe("DELETE /recipes", () => {
		it("should be able to delete a recipe", async () => {
			const { body: allRecipes } = await request(app).get("/recipes");

			const id = allRecipes[1]._id;

			const { body: newRecipes } = await request(app)
				.delete("/recipes/" + id)
				.expect(200);
			expect(newRecipes).toEqual(
				expect.not.objectContaining({
					title: "banana bread",
					ingredients: ["banana", "flour"],
					instructions: ["pray"]
				})
			);
		});
	});
});
