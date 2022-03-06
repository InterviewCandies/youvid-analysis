import React, {useContext} from "react";
import NavBar from "../../components/Navbar/NavBar";
import {
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography, Button
} from "@material-ui/core";
import {CategoryType, ChannelOverview, ChannelType} from "../../types/types";
import {categoriesContext} from "../../Provider/CategoryProvider";
import {TouchApp} from "@material-ui/icons";
import Card from "../../components/Card/Card";
import {formatNumber} from "../../utils/numberFormatHelper";
import {Mapper} from "../../utils/mapper";
import LineCharts from "../../components/LineCharts/LineCharts";
import ScatterCharts from "../../components/ScatterCharts/ScatterCharts";
import Loader from "../../components/Loader/Loader";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: "#1e2328",
    },
    body: {
        color: "#fff",
        padding: "3rem",
        "& > *": {
            marginBottom: "2rem",
        },
    },
    table: {
        color: "#fff"
    }
}));

function createColumns(categories: string[]) {
    const columns = [{
        id: 'Metric',
        label: 'Metric'
    },...categories.map(category => ({
        id: category,
        label: category,
    }))];

    return columns;
}

function createRows(categories: CategoryType[]) {
    if (!categories.length) {
        return [];
    }

    const metrics = Object.keys(categories[0]);
    metrics.shift();

    const names = categories.map(category => category.channel_category);

    return metrics.map(metric => {
        const items: Record<string, any> = { Metric: metric };

        names.forEach((name, i) => {
            if (name) {
                items[name] = categories[i][metric];
            }
        })

        return items;
    })
}

function Categories() {
    const categories = useContext(categoriesContext);
    const classes = useStyles();
    const columns: CategoryType[] = createColumns(categories.map(category => category.channel_category as string));
    const rows: CategoryType[] = createRows(categories);
    return  <div className={classes.root}>
        <NavBar/>
        {categories.length ? (
            <Grid container className={classes.body}>
                <Grid
                    item
                    xs={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="sticky table" className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = column?.id ? row[column.id] : null;
                                                return (
                                                    <TableCell key={column.id}>
                                                        {value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item
                      xs={12}>
                </Grid>
            </Grid>
        ) : (
            <Loader/>
        )}
    </div>
}

export default Categories;