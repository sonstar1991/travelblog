import Link from "next/link";
import renderHTML from "react-render-html";
import { useState, useEffect } from "react";
import { listSearch } from "../../actions/blog";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ""
  });

  const { search, results, searched, message } = values;

  const searchSubmit = e => {
    e.preventDefault();
    listSearch({ search }).then(data => {
      setValues({
        ...values,
        searched: true,
        results: data,
        message: `${data.length} blogs found`
      });
    });
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((blog, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${blog.slug}`}>
                <a className="text-primary">{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const useStyles = makeStyles(theme => ({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  }));

  const searchForm = () => {
    const classes = useStyles();
    return (
      <form
        className="row pl-0 pr-0 form-inline"
        onSubmit={searchSubmit}
        id="search-form"
      >
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search"
            onChange={handleChange}
          />
          <IconButton
            type="submit"
            aria-label="search"
            className={classes.iconButton}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    );
  };

  return (
    <div className="container">
      <div className="pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: "-100px", marginBottom: "-80px" }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
