---
title: Bazel Docker
---

# Bazel Docker

- 使用 pkg_tar 来实现放到指定目录
-  https://github.com/google/go-containerregistry

[pkg_tar]: https://docs.bazel.build/versions/main/be/pkg.html


```py title="WORKSPACE"
######################
# DOCKER SUPPORT
######################
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "59536e6ae64359b716ba9c46c39183403b01eabfbd57578e84398b4829ca499a",
    strip_prefix = "rules_docker-0.22.0",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_docker/releases/download/v0.22.0/rules_docker-v0.22.0.tar.gz",
        "https://github.com/bazelbuild/rules_docker/releases/download/v0.22.0/rules_docker-v0.22.0.tar.gz",
    ],
)

load(
    "@io_bazel_rules_docker//repositories:repositories.bzl",
    container_repositories = "repositories",
)

container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

######################
# Base Images
######################
load("@io_bazel_rules_docker//container:container.bzl","container_pull")

container_pull(
    name = "wener_base",
    registry = "index.docker.io",
    repository = "wener/base",
    tag = "v3.15.0",
    digest = "sha256:89b9bf7962fc0800a4606d44ed5295b466487e40e9dd27a5a20147baa3d5bfd5",
)
```


```py title="build/BUILD.bazel"
load("@rules_pkg//:pkg.bzl", "pkg_tar")
load("@io_bazel_rules_docker//container:container.bzl", "container_image", "container_push")

pkg_tar(
    name = "server-tar",
    srcs = ["//cmd/server"],
    package_dir = "/opt/server/bin",
    strip_prefix = "/cmd/server/server_",
)

container_image(
    name = "server",
    base = "@wener_base//image",
    cmd = ["/opt/server/bin/server"],
    tars = [":server-tar"],
    visibility = ["//visibility:public"],
)

container_push(
    name = "push_server",
    format = "Docker",
    image = ":server",
    registry = "registry.example.com",
    repository = "wener/server",
    tag = "develop",
)
```
