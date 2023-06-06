use std::env;

use axum::{routing::get, Router};
use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    println!("cold start?");

    let app = Router::new().route("/", get(hello));
    let port = env::var("PORT").unwrap().parse().unwrap();
    let addr = SocketAddr::from(([0, 0, 0, 0], port));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn hello() -> &'static str {
    "hello"
}
