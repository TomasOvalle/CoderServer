const fs = require("fs");
const crypto = require("crypto")

class ProductManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init() {
        const exist = fs.existsSync(this.path);
        if (!exist) {
            const stringData = JSON.stringify([], null, 2);
            fs.writeFileSync(this.path, stringData);
            console.log("Producto ingresado");
        } else {
            console.log("Este producto ya existe");
        }
    }

    async create(data) {
        try {
            if (!data.title) {
                throw new Error("Ingrese Producto")
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo,
                    category: data.category,
                    price: data.price,
                    stock: data.stock
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(product);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({created: product.id});
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async read() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            if (all.length === 0) {
                throw new Error("No hay productos")
            } else {
                console.log(all);
                return all
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (!product) {
                throw new Error("No encontrado");
            } else {
                console.log(product);
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let product = all.find((each) => each.id === id);
            if (!product) {
                throw new Error("No se encontro")
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2)
                await fs.promises.writeFile(this.path, filtered);
                console.log({deleted: product.id});
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }
}




async function test() {
    try {
        const products = new ProductManager();

        /*await products.create({
            title: "Producto 1",
            photo: "path/to/photo1.jpg",
            category: "Categoria 1",
            price: 100,
            stock: 5
        })

        await products.create({
            title: "Producto 2",
            photo: "path/to/photo2.jpg",
            category: "Categoria 2",
            price: 200,
            stock: 10
        })

        await products.create({
            title: "Producto 3",
            photo: "path/to/photo3.jpg",
            category: "Categoria 3",
            price: 300,
            stock: 15
        })

        await products.create({
            title: "Producto 4",
            photo: "path/to/photo4.jpg",
            category: "Categoria 4",
            price: 400,
            stock: 20
        })

        await products.create({
            title: "Producto 5",
            photo: "path/to/photo5.jpg",
            category: "Categoria 5",
            price: 500,
            stock: 25
        })

        await products.create({
            title: "Producto 6",
            photo: "path/to/photo6.jpg",
            category: "Categoria 6",
            price: 600,
            stock: 30
        })

        await products.create({
            title: "Producto 7",
            photo: "path/to/photo7.jpg",
            category: "Categoria 7",
            price: 700,
            stock: 35
        })

        await products.create({
            title: "Producto 8",
            photo: "path/to/photo8.jpg",
            category: "Categoria 8",
            price: 800,
            stock: 40
        })

        await products.create({
            title: "Producto 9",
            photo: "path/to/photo9.jpg",
            category: "Categoria 9",
            price: 900,
            stock: 45
        })

        await products.create({
            title: "Producto 10",
            photo: "path/to/photo10.jpg",
            category: "Categoria 10",
            price: 1000,
            stock: 50
        })*/

        //await products.read();
        //await products.readOne("b21c2bcf742af33dc11adb9a")
        await products.destroy("b48ac3a467500ebf6547fe18")

    } catch (error) {
        console.log(error);
    }
}
test();