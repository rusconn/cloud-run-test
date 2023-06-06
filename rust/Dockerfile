FROM rust:1.70.0-slim-bullseye as builder
WORKDIR /work
ENV CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse
RUN rustup target add x86_64-unknown-linux-musl
COPY . .
RUN cargo build --release --target x86_64-unknown-linux-musl

FROM scratch
WORKDIR /app
COPY --from=builder /work/target/x86_64-unknown-linux-musl/release/hello .
ENTRYPOINT [ "./hello" ]
