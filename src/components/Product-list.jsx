import {
  CircularProgress,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";
import * as React from "react";
import { useEffect, useState } from "react";
import ProductService, { deleteProduct } from "../services/product";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  tableContainer: {
    maxHeight: "640px",
    marginTop: "1%",
  },

  paperContainer: {
    width: "80%",
  },
}));

export const ProductList = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  const classes = useStyles();
  const productService = new ProductService();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await productService.getProducts();

      setProducts(data);
      setTotalProducts(data.length);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      navigate(`/`);
    } catch (e) {
      console.warn(e);
    }
  };

  const goToDetailProduct = async (id) => {
    try {
      navigate("/product/" + id);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <div
        style={{ justifyContent: "center", display: "flex", marginTop: "1%" }}
      >
        <Paper className={classes.paperContainer}>
          <TableContainer className={classes.tableContainer}>
            <NavLink to="/new" style={{ textDecoration: "none" }}>
              <Button variant="contained" className="add_product_btn">
                {" "}
                Add a product
              </Button>
            </NavLink>
            <Table stickyHeader>
              <TableHead>
                <TableCell align="center" colSpan={5} className="title_table">
                  Products
                </TableCell>
              </TableHead>
              <TableHead>
                <TableRow className="table_row">
                  <TableCell>Id</TableCell>
                  <TableCell> Price </TableCell>
                  <TableCell> Name </TableCell>
                  <TableCell> Category </TableCell>
                  <TableCell className="action_cell">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => {
                    return (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>{product.title}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>
                          <div className="table_btns">
                            <Button
                              variant="contained"
                              type="submit"
                              className="table_btn"
                              onClick={() => {
                                handleDelete(product.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              type="submit"
                              className="table_btn"
                              onClick={() => {
                                goToDetailProduct(product.id);
                              }}
                            >
                              Details
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            {isLoading && <CircularProgress color="secondary" size={25} />}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={totalProducts}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};
