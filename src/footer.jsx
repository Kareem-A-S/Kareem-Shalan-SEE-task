function MyFooter() {
  return (
    <>
      <div className="container footerContainer">
        {" "}
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
          {" "}
          <div className="col mb-3">
            {" "}
            <a
              href="/"
              className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
              aria-label="Bootstrap"
            >
              {" "}
              <svg
                className="bi me-2"
                width="40"
                height="32"
                aria-hidden="true"
              ></svg>{" "}
            </a>{" "}
            <p>© 2025</p>{" "}
          </div>{" "}
          <div className="col mb-3"></div>{" "}
          <div className="col mb-3">
            {" "}
            <h5>Section</h5>{" "}
            <ul className="nav flex-column">
              {" "}
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 ">
                  Home
                </a>
              </li>{" "}
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 ">
                  Features
                </a>
              </li>{" "}
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 ">
                  Pricing
                </a>
              </li>{" "}
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 ">
                  FAQs
                </a>
              </li>{" "}
              <li className="nav-item mb-2">
                <a href="#" className="nav-link p-0 ">
                  About
                </a>
              </li>{" "}
            </ul>{" "}
          </div>{" "}
        </footer>{" "}
      </div>
    </>
  );
}

export default MyFooter;
