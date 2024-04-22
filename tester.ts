const password = "super-secure-pa$$word";



// use bcrypt
const bcryptHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 4, // number between 4-31
});
console.log(bcryptHash);
const isMatch = await Bun.password.verify(password, bcryptHash);
console.log(isMatch);