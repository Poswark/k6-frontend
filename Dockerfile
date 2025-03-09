
ARG GO_VERSION=1.23.6
ARG VARIANT=alpine3.21
FROM golang:${GO_VERSION}-${VARIANT} AS builder

RUN apk update && apk add git bash
RUN git clone https://github.com/grafana/xk6.git 


COPY . .

ARG GOFLAGS="-ldflags=-w -ldflags=-s"
ARG FIXUID_VERSION=v0.6.0
RUN CGO_ENABLED=0 go build -o xk6 -trimpath ./cmd/xk6/main.go
RUN cd xk6/
RUN CGO_ENABLED=0 GOBIN=/build go install github.com/boxboat/fixuid@${FIXUID_VERSION}
WORKDIR /build
FROM golang:${GO_VERSION}-${VARIANT}



COPY --from=builder /build/fixuid /usr/local/bin/

RUN chown root:root /usr/local/bin/fixuid && \
    chmod 4755 /usr/local/bin/fixuid

RUN addgroup --gid 20 xk6 && \
    adduser --uid 501 --ingroup xk6 --home /home/xk6 --shell /bin/sh --disabled-password --gecos "" xk6

RUN USER=xk6 && \
    GROUP=xk6 && \
    mkdir -p /etc/fixuid && \
    printf "user: $USER\ngroup: $GROUP\n" > /etc/fixuid/config.yml

COPY --from=builder /build/xk6 /usr/local/bin/

COPY docker-entrypoint.sh /usr/local/bin/entrypoint.sh

WORKDIR /xk6
RUN chown xk6:xk6 /xk6
USER xk6

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]