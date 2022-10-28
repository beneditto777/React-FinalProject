function Footer() {
    return(
        // <div class="container">
            // <footer class="py-3 my-4 bg-dark">
            //     <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            //     <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
            //     <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
            //     <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
            //     <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
            //     <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
            //     </ul>
            //     <p class="text-center text-muted">© 2022 Company, Inc</p>
            // </footer>
        // </div>

        <footer className="text-center text-dark" style={{backgroundColor: "#f1f1f1"}}>
            <div className="container pt-4">
                <section className="mb-4">
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        db-ripple-color="dark"
                    ><i className="fab fa-facebook-f"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-twitter"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-google"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-instagram"></i></a>

                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-linkedin"></i></a>
                    <a
                        className="btn btn-link btn-floating btn-lg text-dark m-1"
                        href="#!"
                        role="button"
                        data-mdb-ripple-color="dark"
                    ><i className="fab fa-github"></i></a>
                </section>
            </div>

            <div className="text-center text-dark p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                © 2022 Movie
                <a className="text-dark" href="https://mdbootstrap.com/"> MDBootstrap.com</a>
            </div>
        </footer>
    )
}

export default Footer