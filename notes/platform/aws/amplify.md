---
title: amplify
---

# amplify

## Build

:::caution

- 构建前尽量注意选择下更新的构建镜像，老的镜像可能出现各种问题

:::

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 20
        - npm i -g pnpm
        - pnpm install
    build:
      commands:
        - nvm use 20
        - pnpm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### amazonlinux:2

```dockerfile
# Use the standard Amazon Linux base, provided by ECR/KaOS
# It points to the standard shared Amazon Linux image, with a versioned tag.
FROM amazonlinux:2

# https://docs.docker.com/engine/reference/builder/#maintainer-deprecated
LABEL maintainer="Amazon AWS"

# Framework Versions
ENV VERSION_NODE_8=8.12.0
ENV VERSION_NODE_10=10.16.0
ENV VERSION_NODE_12=12
ENV VERSION_NODE_14=14
ENV VERSION_NODE_16=16
ENV VERSION_NODE_17=17
ENV VERSION_NODE_DEFAULT=$VERSION_NODE_14
ENV VERSION_RUBY_2_4=2.4.6
ENV VERSION_RUBY_2_6=2.6.3
ENV VERSION_BUNDLER=2.0.1
ENV VERSION_RUBY_DEFAULT=$VERSION_RUBY_2_4
ENV VERSION_HUGO=0.75.1
ENV VERSION_YARN=1.22.0
ENV VERSION_AMPLIFY=6.3.1

# UTF-8 Environment
ENV LANGUAGE en_US:en
ENV LANG=en_US.UTF-8
ENV LC_ALL en_US.UTF-8

## Install OS packages
RUN touch ~/.bashrc
RUN yum -y update \
  && yum -y install \
    alsa-lib-devel \
    autoconf \
    automake \
    bzip2 \
    bison \
    bzr \
    cmake \
    expect \
    fontconfig \
    git \
    gcc-c++ \
    GConf2-devel \
    gtk2-devel \
    gtk3-devel \
    libnotify-devel \
    libpng \
    libpng-devel \
    libffi-devel \
    libtool \
    libX11 \
    libXext \
    libxml2 \
    libxml2-devel \
    libXScrnSaver \
    libxslt \
    libxslt-devel \
    libyaml \
    libyaml-devel \
    make \
    nss-devel \
    openssl-devel \
    openssh-clients \
    patch \
    procps \
    python3 \
    python3-devel \
    readline-devel \
    sqlite-devel \
    tar \
    tree \
    unzip \
    wget \
    which \
    xorg-x11-server-Xvfb \
    zip \
    zlib \
    zlib-devel \
    yum clean all \
  && rm -rf /var/cache/yum

## Install Hugo
RUN wget https://github.com/gohugoio/hugo/releases/download/v${VERSION_HUGO}/hugo_${VERSION_HUGO}_Linux-64bit.tar.gz \
  && tar -xf hugo_${VERSION_HUGO}_Linux-64bit.tar.gz hugo -C / \
  && mv /hugo /usr/bin/hugo \
  && rm -rf hugo_${VERSION_HUGO}_Linux-64bit.tar.gz

## Install dotnet sdk and host 3.1
RUN rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
RUN yum -y install dotnet-host-3.1.4
RUN yum -y install dotnet-sdk-3.1

## Install amazon dotnet tools
RUN dotnet tool install -g Amazon.Lambda.Tools
RUN dotnet tool install -g Amazon.Lambda.TestTool-3.1

## Install python3.8
RUN wget https://www.python.org/ftp/python/3.8.0/Python-3.8.0.tgz
RUN tar xvf Python-3.8.0.tgz
WORKDIR Python-3.8.0
RUN ./configure --enable-optimizations --prefix=/usr/local
RUN make altinstall

## Install python3.9
RUN wget https://www.python.org/ftp/python/3.9.0/Python-3.9.0.tgz
RUN tar xvf Python-3.9.0.tgz
WORKDIR Python-3.9.0
RUN ./configure --enable-optimizations --prefix=/usr/local
RUN make altinstall

## Install Node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
RUN /bin/bash -c ". ~/.nvm/nvm.sh &&     nvm install $VERSION_NODE_8 && nvm use $VERSION_NODE_8 && \
	nvm install $VERSION_NODE_10 && nvm use $VERSION_NODE_10 && \
	npm install -g yarn@${VERSION_YARN} sm grunt-cli bower vuepress gatsby-cli && \
	nvm install $VERSION_NODE_12 && nvm use $VERSION_NODE_12 && \
	npm install -g yarn@${VERSION_YARN} sm grunt-cli bower vuepress gatsby-cli && \
	nvm install $VERSION_NODE_14 && nvm use $VERSION_NODE_14 && \
	npm install -g yarn@${VERSION_YARN} sm grunt-cli bower vuepress gatsby-cli && \
	nvm install $VERSION_NODE_16 && nvm use $VERSION_NODE_16 && chown -R root:root /root/.nvm &&  \
	npm install -g yarn@${VERSION_YARN} sm grunt-cli bower vuepress gatsby-cli && \
	nvm install $VERSION_NODE_17 && nvm use $VERSION_NODE_17 && chown -R root:root /root/.nvm && \
    npm install -g yarn@${VERSION_YARN} sm grunt-cli bower vuepress gatsby-cli && \
	nvm alias default ${VERSION_NODE_DEFAULT} && nvm cache clear"

# Handle yarn for any `nvm install` in the future
RUN echo "yarn@${VERSION_YARN}" > /root/.nvm/default-packages

## Install Ruby 2.4.x and 2.6.x
## https://github.com/rvm/rvm/issues/5096 | https://rvm.io/rvm/security#install-our-keys - The old keyserver is no longer available
RUN curl -sSL https://rvm.io/mpapis.asc | gpg --import - && curl -sSL https://rvm.io/pkuczynski.asc | gpg --import - && curl -sL https://get.rvm.io | bash -s -- --with-gems="bundler"

ENV PATH /usr/local/rvm/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
RUN /bin/bash --login -c "\
	rvm install $VERSION_RUBY_2_4 && rvm use $VERSION_RUBY_2_4 && gem install bundler -v $VERSION_BUNDLER && gem install jekyll && \
	rvm install $VERSION_RUBY_2_6 && rvm use $VERSION_RUBY_2_6 && gem install bundler -v $VERSION_BUNDLER && gem install -N jekyll && \
	rvm cleanup all"

## Install awscli
RUN /bin/bash -c "pip3.8 install awscli && rm -rf /var/cache/apk/*"
RUN /bin/bash -c "pip3.9 install awscli && rm -rf /var/cache/apk/*"

## Install SAM CLI
RUN /bin/bash -c "pip3.8 install aws-sam-cli"
RUN /bin/bash -c "pip3.9 install aws-sam-cli"

## Installing Cypress
RUN /bin/bash -c ". ~/.nvm/nvm.sh && \
    nvm use ${VERSION_NODE_DEFAULT} && \
    npm install -g --unsafe-perm=true --allow-root cypress"

## Install AWS Amplify CLI for all node versions
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_8} && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_10} && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_12} && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_14} && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_16} && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"
RUN /bin/bash -c ". ~/.nvm/nvm.sh && nvm use ${VERSION_NODE_17}  && \
    npm config set user 0 && npm config set unsafe-perm true && \
	npm install -g @aws-amplify/cli@${VERSION_AMPLIFY}"

## Environment Setup
RUN echo export PATH="/usr/local/rvm/gems/ruby-${VERSION_RUBY_DEFAULT}/bin:\
/usr/local/rvm/gems/ruby-${VERSION_RUBY_DEFAULT}@global/bin:\
/usr/local/rvm/rubies/ruby-${VERSION_RUBY_DEFAULT}/bin:\
/usr/local/rvm/bin:\
/root/.nvm/versions/node/${VERSION_NODE_DEFAULT}/bin:\
$(python3 -m site --user-base)/bin:\
$(python3.8 -m site --user-base)/bin:\
$(python3.9 -m site --user-base)/bin:\
$PATH" >> ~/.bashrc \
  && echo export GEM_PATH="/usr/local/rvm/gems/ruby-${VERSION_RUBY_DEFAULT}" >> ~/.bashrc \
  && echo "nvm use ${VERSION_NODE_DEFAULT} 1> /dev/null" >> ~/.bashrc \
  && echo "export PATH=$PATH:/root/.dotnet/tools" >> ~/.bashrc

ENTRYPOINT [ "bash", "-c" ]
```

### amazonlinux:2023

```dockerfile
FROM public.ecr.aws/amazonlinux/amazonlinux:2023

LABEL maintainer="Amazon AWS"

######################################################################
#   Environment variable to identify the image version at runtime    #
######################################################################

ENV AWS_AMPLIFY_BUILD_IMAGE_VERSION=2023-11

###########################
#   Install OS packages   #
###########################

RUN yum -y update \
  && yum -y install --allowerasing \
    alsa-lib-devel \
    autoconf \
    automake \
    bzip2 \
    bison \
    cmake \
    expect \
    fontconfig \
    gawk \
    gcc-c++ \
    git \
    gnupg2 \
    gtk3-devel \
    libnotify-devel \
    libpng \
    libpng-devel \
    libffi-devel \
    libtool \
    libX11 \
    libXext \
    libxml2 \
    libxml2-devel \
    libXScrnSaver \
    libxslt \
    libxslt-devel \
    libwebp \
    libwebp-devel \
    libyaml \
    libyaml-devel \
    make \
    nss-devel \
    openssl-devel \
    openssh-clients \
    patch \
    procps \
    readline-devel \
    sqlite-devel \
    sudo \
    tar \
    tree \
    unzip \
    vi \
    wget \
    which \
    xorg-x11-server-Xvfb \
    zip \
    zlib \
    zlib-devel \
    bzip2-devel \
  && yum clean all \
  && rm -rf /var/cache/yum

USER root
ENV HOME=/root

RUN echo '# Aliases to allow running commands without `sudo`,\n''# pretending to be running as root\n''alias yum="sudo yum"\n''alias dfn="sudo dnf"\n''alias rpm="sudo rpm"\n''alias amazon-linux-extras="sudo amazon-linux-extras"\n''\n''# Load NVM when the shell is initialized\n''export NVM_DIR="$HOME/.nvm"\n''[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"\n''\n' \
  > $HOME/.bashrc

###########################
#   Create Amplify user   #
###########################

RUN adduser --system --uid 900 --create-home --home-dir $HOME amplify \
  && echo "amplify ALL = NOPASSWD : /usr/bin/yum, /usr/bin/dnf, /bin/rpm, /usr/bin/amazon-linux-extras" >> /etc/sudoers \
  && chown -R amplify:amplify $HOME \
  && chmod -R u+w $HOME

RUN chown root:root /usr/bin
RUN usermod -aG root amplify
RUN chmod 775 /usr/bin

USER amplify

#####################################
#   Change base working directory   #
#####################################

WORKDIR $HOME
RUN mkdir -p $HOME/bin

###############################################
#   Install NPM, Node, and default packages   #
###############################################

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
ENV NVM_DIR=$HOME/.nvm

RUN echo \
  '@aws-amplify/cli\n''bower\n''cypress\n''grunt-cli\n''hugo-extended\n''vuepress\n''yarn' \
  > $NVM_DIR/default-packages

RUN chown amplify:amplify $NVM_DIR/default-packages

RUN [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
  && nvm install 14 \
  && nvm install 16 \
  && nvm install 18 \
  && nvm install 20 \
  && nvm alias default 18 \
  && nvm cache clear

###################################################
#   Install Pyenv, Python, and default packages   #
###################################################

ENV PYENV_ROOT=$HOME/.pyenv
ENV PATH="$PYENV_ROOT/bin:$PATH"

RUN curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash \
  && git clone https://github.com/jawshooah/pyenv-default-packages.git $PYENV_ROOT/plugins/pyenv-default-packages \
  && echo 'eval "$(pyenv init -)"' >> $HOME/.bashrc

RUN echo \
  'awscli >= 1\n''aws-sam-cli >= 1.90.0' \
  > $PYENV_ROOT/default-packages

RUN chown amplify:amplify $PYENV_ROOT/default-packages

RUN pyenv install 3.8 \
  && pyenv install 3.9 \
  && pyenv install 3.10 \
  && pyenv install 3.11 \
  && pyenv global 3.10

###################################################################
#   Create symlinks for old versions of Python,                   #
#   this keeps backwards compatibility with the previous image.   #
###################################################################

USER root
RUN ln -s $HOME/.pyenv/shims/python3.8 /usr/bin/python3.8 \
  && ln -s $HOME/.pyenv/shims/pip3.8 /usr/bin/pip3.8
USER amplify

###############################################
#   Install RVM, Ruby, and default packages   #
###############################################

ENV RVM_ROOT=$HOME/.rvm/
ENV PATH="$RVM_ROOT/bin:$PATH"

RUN command curl -sSL https://rvm.io/mpapis.asc | gpg --import - \
  && command curl -sSL https://rvm.io/pkuczynski.asc | gpg --import - \
  && curl -sSL https://get.rvm.io | bash -s stable

RUN echo \
  'bundler\n''jekyll\n''jekyll-sass-converter' \
  > $RVM_ROOT/gemsets/default.gems

RUN chown amplify:amplify $RVM_ROOT/gemsets/default.gems

RUN rvm install 3.0.6 \
  && rvm install 3.1.4 \
  && rvm install 3.2.2 --default \
  && rvm cleanup all

ENV PATH="$HOME/bin:$PATH"
RUN echo 'export PATH="$PATH"' >> $HOME/.bashrc
ENTRYPOINT [ "bash", "-c" ]
```
