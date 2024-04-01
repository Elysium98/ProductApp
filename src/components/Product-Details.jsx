import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/product";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const productService = new ProductService();

  useEffect(() => {
    (async () => {
      try {
        console.log(id);
        const product = await productService.getProductById(id);
        setProduct(product);
      } catch (e) {
        console.warn(e);
        navigate("/", { replace: true, state: { id } });
      }
    })();
  }, [id]);
  if (product === null) {
    return <div></div>;
  }

  return (
    <div>
      <div className="div-card">
        <Card className="card" style={{ textAlign: "justify" }}>
          <CardContent>
            <Button
              className="Product-Button"
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Typography
              gutterBottom
              variant="h2"
              component="div"
              style={{ textAlign: "center" }}
            >
              Description
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
