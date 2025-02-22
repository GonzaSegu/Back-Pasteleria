const request = require("supertest");
const app = require("../../testServer");

describe("Test de ruta: GET /api/productos", () => {
    test("Debe retornar status 200 y una lista de productos", async () => {
        const response = await request(app).get("/api/productos");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("msg", "Listado de productos");
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("results");
        expect(Array.isArray(response.body.data.results)).toBe(true);
        expect(response.body.data.results.length).toBeGreaterThan(0);
    });
    test("Debe retornar status 200 y una lista de productos filtrados con paginación", async () => {
        const response = await request(app).get("/api/productos/filter").query({
            categoria_id: 1,  
            azucar: true,
            gluten: true,
            lactosa: false,
            limit: 5,
            page: 1
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("msg", "Listado de productos filtrados");
        expect(response.body).toHaveProperty("data");

        const { data } = response.body;

        expect(data).toHaveProperty("total");
        expect(data).toHaveProperty("results");
        expect(data).toHaveProperty("pagination");

        expect(Array.isArray(data.results)).toBe(true);

        expect(data.pagination).toHaveProperty("current_page");
        expect(data.pagination).toHaveProperty("total_pages");
        expect(data.pagination).toHaveProperty("next_page");
        expect(data.pagination).toHaveProperty("prev_page");

        // Verificar que los productos cumplen con los filtros
        data.results.forEach(producto => {
            expect(producto.categoria_id).toBe(1);
            expect(producto.azucar).toBe(true);
            expect(producto.gluten).toBe(true);
            expect(producto.lactosa).toBe(false);
        });
    });

    test("Debe retornar todos los productos si no se envían filtros", async () => {
        const response = await request(app).get("/api/productos/filter");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data).toHaveProperty("results");
        expect(Array.isArray(response.body.data.results)).toBe(true);
    });

    test("Debe manejar correctamente una página fuera de rango", async () => {
        const response = await request(app).get("/api/productos/filter").query({
            page: 9999
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.data.pagination.current_page).toBeLessThanOrEqual(response.body.data.pagination.total_pages);
    });
});
