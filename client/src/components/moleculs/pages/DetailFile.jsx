import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { fetchOneBook } from "../../../redux/admin/book/adminBookAction";
import Footer from "../footer/footer";
import Header from "../header/header";
import Loading from "../spinner/Spinner";
import { ResponsiveEmbed, Button } from "react-bootstrap";

const DetailFile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { book, isLoading } = useSelector((state) => state.adminBook);
  const bookID = location.pathname.substr(
    location.pathname.lastIndexOf("/") + 1
  );

  useEffect(() => {
    dispatch(fetchOneBook(bookID));
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container vh-100">
          {book && (
            <>
              <div className="row justify-content-between">
                <div className="col-3">
                  <button
                    className="btn btn-primary text-light"
                    onClick={() => {
                      history.push(`/categories/${book.data.category_id}`);
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div className="row vh-100">
                <h3 className="text-center">{book.data.title}</h3>
                <div className="mb-2">
                  <Button
                    href={book.data.url_file}
                    className="btn btn-primary text-light"
                  >
                    Download
                  </Button>
                </div>
                <div className="mx-auto embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item mb-3"
                    allowFullScreen
                    title="file"
                    src={`//docs.google.com/gview?url=${book.data.url_file}&embedded=true`}
                    // src={book.data.url_file}
                  />
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: book.data.url_video }}
                ></div>
              </div>
            </>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default DetailFile;
