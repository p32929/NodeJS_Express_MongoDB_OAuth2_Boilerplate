# NodeJS_Express_MongoDB_OAuth2_Boilerplate

A starting point for a Node.js REST API: Express, MongoDB via Mongoose, and JWT-based auth with a working users CRUD already in place. Built to save a friend (and me) the first afternoon of every new project.

## What's included

1. **Express** with `helmet`, `cors`, `compression` and `morgan` already configured
2. **Mongoose** models (`User`, `OAuthAccessToken`) with `mongoose-autopopulate`
3. **JWT auth** via Passport (`passport-jwt`, `passport-http`) behind an `Auth.isAuthenticated` middleware
4. **A complete users API** — login, create, list, get by id or email, update, delete
5. **Winston logging** and Pug views for the error pages
6. **nodemon** on `npm start`

## Getting started

```bash
git clone https://github.com/p32929/NodeJS_Express_MongoDB_OAuth2_Boilerplate.git
cd NodeJS_Express_MongoDB_OAuth2_Boilerplate
npm install
npm start
```

You need a MongoDB running. The connection string lives in `utils/constants.js` (defaults to `mongodb://localhost:27017/boilerplate2`) — change it there.

## Users API

| Method | Route | Auth | What it does |
|---|---|---|---|
| `POST` | `/users/login/` | no | Log in, returns a token |
| `POST` | `/users/` | yes | Create a user |
| `GET` | `/users/` | yes | List users (paginated, 20 per page) |
| `GET` | `/users/byemail/:id` | yes | Find a user by email |
| `GET` | `/users/byid/:id` | yes | Find a user by id |
| `PUT` | `/users/:id` | yes | Update a user |
| `DELETE` | `/users/:id` | yes | Delete one user |
| `DELETE` | `/users/` | yes | Delete all users |

## Good to know

This is a starter template from 2020. Its packages (Express 4, Mongoose 5, Passport 0.4 and others) are old, so run `npm outdated` and update them before you build something real on it.

## License

MIT License — Copyright (c) 2020 Fayaz Bin Salam. See [LICENSE](LICENSE) for the full text.

## Contributing

Contributions are very welcome, thank you! Before you start on a pull request, please open an issue and tell me what you would like to add or change. That way we can agree on it first, and your time is not wasted on something that might not fit. Thanks for helping make this boilerplate better.

## You might also like

<p><a href="https://openstore.pfay.workers.dev/more/p32929/_/0"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/0-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/0-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (1)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/1"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/1-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/1-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (2)"></picture></a><br><a href="https://openstore.pfay.workers.dev/more/p32929/_/2"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/2-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/2-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (3)"></picture></a><a href="https://openstore.pfay.workers.dev/more/p32929/_/3"><picture><source media="(prefers-color-scheme: dark)" srcset="https://openstore.pfay.workers.dev/more/p32929/_/3-dark.svg"><img src="https://openstore.pfay.workers.dev/more/p32929/_/3-light.svg" width="50%" align="top" alt="More apps by p32929 on OpenStore (4)"></picture></a></p>

<p><a href="https://p32929.github.io/share/?repo=NodeJS_Express_MongoDB_OAuth2_Boilerplate"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-share-dark.svg"><img src="https://p32929.github.io/readme/footer-share-light.svg" width="50%" align="top" alt="Share this project with your friends in one click"></picture></a><a href="https://p32929.github.io/support/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-support-dark.svg"><img src="https://p32929.github.io/readme/footer-support-light.svg" width="50%" align="top" alt="If you like my work and want to support me, feel free to support"></picture></a><br><a href="https://openstore.pfay.workers.dev/add"><picture><source media="(prefers-color-scheme: dark)" srcset="https://p32929.github.io/readme/footer-join-dark.svg"><img src="https://p32929.github.io/readme/footer-join-light.svg" width="100%" align="top" alt="Put your own apps on OpenStore: free, your listing lives in your own repo"></picture></a></p>
