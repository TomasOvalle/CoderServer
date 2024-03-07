class UserManager {
    static #users = [];

    create(data) {
        const user = {
            id:
                UserManager.#users.length === 0
                    ? 1
                    : UserManager.#users[UserManager.#users.length - 1].id +1,
            photo: data.photo,
            email: data.email,
            password: data.password,
            role: 0,
        };
        UserManager.#users.push(user);
        console.log("Se ha creado un usuario");
    }
    read() {
        return UserManager.#users
    }
}

const usuarios = new UserManager()

usuarios.create({
    photo: "photo1.jpg",
    email: "email@email.com",
    password: "password"
})

usuarios.create({
    photo: "photo2.jpg",
    email: "email2@email",
    password: "password2"
})

console.log(usuarios.read());