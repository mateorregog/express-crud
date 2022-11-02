const express = require("express");
const morgan = require("morgan");

const app = express();
let products = [
  {
    id: 1,
    name: "laptop",
    price: 3000,
  },
];
app.use(morgan("dev"));
app.use(express.json());
//Retorna un producto en específico con la ruta /products/(numero de id)
app.get("/products/:id", (req, res) => {
  console.log(req.params.id);
  //Esta función verifica si el producto existe o no
  const productFound = products.find(
    (products) => products.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(400).json({
      message: "product no found",
    });

  console.log(productFound);
  res.json(productFound);
});

//Devuelve todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

//Agrega un nuevo producto al arreglo
app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 }; //Se crea un objeto con los elementos de request body mas el id
  products.push(newProduct); //Se agrega el nuevo producto al arreglo
  res.send(newProduct); //Se envia el producto al cliente
});

app.delete("/products/:id", (req, res) => {
  const productFound = products.find(
    (products) => products.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(400).json({
      message: "product no found",
    });

  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  ); //Devuelve un arreglo filtrando y quitando el producto especificado

  res.sendStatus(204);
});

app.put("/products/:id", (req, res) => {
  const newData = req.body; //{name:"sdgafd", price:10}
  const productFound = products.find(
    (products) => products.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(400).json({
      message: "product no found",
    });

  products = products.map((product) =>
    product.id === parseInt(req.params.id) ? { ...product, ...newData } : product
  ); //Recorrer el arreglo, por cad aproducto comparar su propiedad con el id. Si es true, se actualzian los valores, en caso contrario se mantiene como está
  res.json({
    message: "Producto actualizado"
  });
});

app.listen(3000);

console.log(`Server on port ${3000}`);
