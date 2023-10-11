import "./styles/index.css";

const userStack = {
  language: "Javascript",
  framework: "React",
};

const user = {
  name: "Konst",
  age: 38,
  ...userStack,
};

const user2 = {
  work: "Frontend development",
  ...user,
};

console.log(user2);
