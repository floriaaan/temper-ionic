<p align="center">
  <a href="https://github.com/floriaaan/temper">
    <img alt="Temper" src="public/assets/icon/favicon.png" width="100" />
  </a>
</p>
<h1 align="center">Temper</h1>

<p align="center">
  A Home Companion application to control your home and your devices
</p>
<p align="center">
  <a href="https://github.com/floriaaan/temper"><img src="https://badgen.net/github/status/floriaaan/temper" alt="Build Status"></a>
  <a href="https://github.com/floriaaan/temper"><img src="https://badgen.net/github/stars/floriaaan/temper" alt="Stargazers"></a>
  <a href="https://github.com/floriaaan/temper"><img src="https://badgen.net/github/forks/floriaaan/temper" alt="Forks"></a>
  <a href="https://github.com/floriaaan/temper"><img src="https://badgen.net/github/release/floriaaan/temper/releases" alt="Latest Release"></a>
</p>

Temper is a powerful open-source domotic application to have full power of all your connected devices.

- **Do more.** With Temper, you have access to all features of your devices, even the one that you created.

- **With less.** No matter who you are, you can easily develop your module to unleash the power of your home.

[**Visit the Documentation** : Learn how to make modules for Temper and Temper API ](https://floriaaan.github.io/temper)

## 🚀 Run a Temper project

You can run Temper in less than half an hour with these steps :

1. **Download the Temper project.**

```
git clone https://github.com/floriaaan/temper myTemperProj
git clone https://github.com/floriaaan/temper-api && cd temper-api && git checkout php
```

2. **Install dependencies and setup the environnement.**

For **temper-api**, you must copy the **.env.example** and rename it **.env** and change the database credentials to fit yours.

```
// In temper directory
npm install

// In temper-api directory
composer install
php artisan migrate:fresh
```

3. **Run the developpement server.**

```
// In temper directory
npm run start

// In temper-api directory
composer install
php -S <localhost:8000> or <0.0.0.0:8000> -t public // Depends if you want to use on any device of your network in dev mode. 
```

You're ready to rock ! 🎉

## 🎓 SOON | Learning Temper

Full documentation will be here **soon**

**Start Learning Temper** : [**Read the Docs**](https://floriaaan.github.io/temper)

## 📕 Before contributing, the Code of Conduct

Temper mean to be a **welcoming** and **safe** place where everybody can help each other in this project. If you feel like contributing, please read and follow our [**SOON | Code of Conduct**](). 🤗

## 🤝 Contributing to Temper

Whether you want to help us, in any possible way, like **fixing bugs**, **improve the docs** or even want to **add a feature**, we'd love to count you in our community 💪 ! 

## 🔐 Security Vulnerabilities

If you discover a security vulnerability within **Temper** or **Temper API**, please open an issue ticket in our Github repository. All security vulnerabilities will be promptly addressed.

## :memo: License

Licensed under the [**GNU General Public License v3.0**](./LICENSE)
  
## 💞 Thanks 

Thanks to everybody that have contribute to this project, everybody that will contribute, and [**Ophzl**](https://github.com/ophzl) 💖.
