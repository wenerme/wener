"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["13722"],{91582:function(e,n,s){s.r(n),s.d(n,{metadata:()=>l,contentTitle:()=>o,default:()=>h,assets:()=>c,toc:()=>t,frontMatter:()=>a});var l=JSON.parse('{"id":"os/macos/brew","title":"Brew","description":"- brew","source":"@site/../notes/os/macos/brew.md","sourceDirName":"os/macos","slug":"/os/macos/brew","permalink":"/notes/os/macos/brew","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/macos/brew.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1702882608000,"frontMatter":{"title":"Brew"},"sidebar":"docs","previous":{"title":"macOS","permalink":"/notes/os/macos/"},"next":{"title":"iTerm2","permalink":"/notes/os/macos/iterm2"}}'),r=s("52676"),i=s("79938");let a={title:"Brew"},o="Brew",c={},t=[{value:"\u5B89\u88C5",id:"install",level:2},{value:"\u57FA\u7840\u5F00\u53D1\u73AF\u5883",id:"dev",level:2},{value:"NodeJS \u73AF\u5883",id:"node",level:2},{value:"Docker",id:"docker",level:2},{value:"\u57FA\u7840\u7684\u8F6F\u4EF6\u5305",id:"\u57FA\u7840\u7684\u8F6F\u4EF6\u5305",level:2},{value:"\u66F4\u6539\u9ED8\u8BA4 SHELL",id:"\u66F4\u6539\u9ED8\u8BA4-shell",level:3},{value:"Font",id:"font",level:3},{value:"FUSE",id:"fuse",level:3},{value:"Tex",id:"tex",level:3},{value:"PHP",id:"php",level:3},{value:"\u5BB9\u5668\u76F8\u5173",id:"\u5BB9\u5668\u76F8\u5173",level:3},{value:"Linuxbrew",id:"linuxbrew",level:2},{value:"\u4F7F\u7528 gcc \u800C\u4E0D\u4F7F\u7528 clang",id:"\u4F7F\u7528-gcc-\u800C\u4E0D\u4F7F\u7528-clang",level:2},{value:"formula",id:"formula",level:2},{value:"tap",id:"tap",level:2},{value:"\u8BBE\u7F6E",id:"\u8BBE\u7F6E",level:2},{value:"\u7F13\u5B58\u76EE\u5F55",id:"\u7F13\u5B58\u76EE\u5F55",level:2},{value:"\u624B\u52A8\u4E0B\u8F7D\u672A\u4E0B\u8F7D\u5B8C\u6210\u7684\u5B89\u88C5\u5305",id:"\u624B\u52A8\u4E0B\u8F7D\u672A\u4E0B\u8F7D\u5B8C\u6210\u7684\u5B89\u88C5\u5305",level:2},{value:"xcode \u7248\u672C\u68C0\u6D4B\u9519\u8BEF",id:"xcode-\u7248\u672C\u68C0\u6D4B\u9519\u8BEF",level:2},{value:"dir_s_mkdir permission denied",id:"dir_s_mkdir-permission-denied",level:2},{value:"openjdk",id:"openjdk",level:2},{value:"\u8FC1\u79FB",id:"\u8FC1\u79FB",level:2},{value:"no such reg",id:"no-such-reg",level:2},{value:"Cannot download non-corrupt",id:"cannot-download-non-corrupt",level:2},{value:"formula.json: update failed, falling back to cached version.",id:"formulajson-update-failed-falling-back-to-cached-version",level:2},{value:"brew 4.0",id:"brew-40",level:2},{value:"\u8FC1\u79FB",id:"\u8FC1\u79FB-1",level:2},{value:"analytics",id:"analytics",level:2}];function d(e){let n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"brew",children:"Brew"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://github.com/Homebrew/brew",children:"brew"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"BSD-2, Ruby"}),"\n",(0,r.jsx)(n.li,{children:"macOS/Linux \u5305\u7BA1\u7406\u5668"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"http://brew.sh/",children:"Brew.sh"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.admonition,{type:"caution",children:(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["/usr/local -> /opt/homebrew\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u65B0\u7248\u672C\u505A\u4E86\u4F4D\u7F6E\u8FC1\u79FB"}),"\n",(0,r.jsx)(n.li,{children:"native \u7684 binary \u90FD\u662F universal binary\uFF0C\u4F46 brew \u7684 binary \u4E0D\u4E00\u5B9A"}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://apple.stackexchange.com/questions/410825",children:"Apple Silicon: port all Homebrew packages under /usr/local/opt/ to /opt/homebrew"})}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"HOMEBREW_PREFIX"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"install",children:"\u5B89\u88C5"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Note"})}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsx)(n.li,{children:"\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u53EF\u80FD\u4F1A\u9700\u8981\u4EE3\u7406"}),"\n",(0,r.jsx)(n.li,{children:"\u4EE3\u7406\u5EFA\u8BAE\u4F7F\u7528 https_proxy \u8FDB\u884C\u8BBE\u7F6E\u6216\u5168\u5C40\u4EE3\u7406"}),"\n",(0,r.jsx)(n.li,{children:"\u5982\u679C\u4F7F\u7528 https_proxy \u5EFA\u8BAE\u4F7F\u7528 http \u4EE3\u7406"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'sudo softwareupdate --install --all # \u7CFB\u7EDF\u66F4\u65B0\nxcode-select --install              # \u5B89\u88C5 xcode command line tools\n\n# \u5B89\u88C5 - \u5982\u679C\u5931\u8D25\uFF0C\u6DFB\u52A0 https_proxy \u4EE3\u7406\n# /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n# \u8D70 ghproxy.com \u907F\u514D\u4EE3\u7406\n/bin/bash -c "$(curl -fsSL https://ghproxy.com/raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n\n# \u914D\u7F6E\u955C\u50CF\nexport HOMEBREW_NO_ANALYTICS=1\nexport HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"\nexport HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"\nexport HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"\n# export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"\nbrew update\n\n# \u6DFB\u52A0\u73AF\u5883\u53D8\u91CF\ntest -r ~/.bash_profile && echo \'eval "$(brew shellenv)"\' >> ~/.bash_profile\ntest -r ~/.zprofile && echo \'eval "$(brew shellenv)"\' >> ~/.zprofile\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://mirror.tuna.tsinghua.edu.cn/help/homebrew/",children:"https://mirror.tuna.tsinghua.edu.cn/help/homebrew/"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"dev",children:"\u57FA\u7840\u5F00\u53D1\u73AF\u5883"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u57FA\u7840\u7A0B\u5E8F\n# sshrc\nbrew install openssh autossh git mosh bash ssh-copy-id sshuttle tmux vim\n\n# Linux/GNU \u547D\u4EE4\nbrew install less nano file-formula findutils coreutils binutils diffutils wget rsync unzip gzip wdiff\nbrew install gnu-{indent,sed,tar,which,units,time} gnutls gpatch grep\nbrew install bash-completion2\n\n# \u5E94\u7528\nbrew install iterm2 google-chrome cyberduck\n"})}),"\n",(0,r.jsx)(n.h2,{id:"node",children:"NodeJS \u73AF\u5883"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'brew install nvm\nmkdir -p ~/.nvm\n# \u914D\u7F6E\u73AF\u5883\u53D8\u91CF\u5230 .zprofile \u6216 .profile\nexport NVM_DIR="$HOME/.nvm"\n[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"                                       # This loads nvm\n[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion\n\n# zprofile for zsh\ntest -r ~/.zprofile && cat << \'EOF\' >> ~/.zprofile\nexport NVM_DIR="$HOME/.nvm"\n[ -s "/usr/local/opt/nvm/nvm.sh" ] && \\. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm\n[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \\. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion\nEOF\n\nnvm install --lts\nnvm use --lts\n'})}),"\n",(0,r.jsx)(n.h2,{id:"docker",children:"Docker"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://orbstack.dev",children:"https://orbstack.dev"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew install orbstack\n\norb docker\n"})}),"\n",(0,r.jsx)(n.h1,{id:"legacy",children:"Legacy"}),"\n",(0,r.jsx)(n.h2,{id:"\u57FA\u7840\u7684\u8F6F\u4EF6\u5305",children:"\u57FA\u7840\u7684\u8F6F\u4EF6\u5305"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u57FA\u7840\n#brew tap caskroom/cask\n#brew tap caskroom/versions\nbrew tap homebrew/versions\n#brew tap homebrew/dupes\n#brew tap homebrew/completions\n#brew tap homebrew/games\n#brew tap homebrew/command-not-found\n\n# \u5148\u5B89\u88C5 Lantern \u7528\u4F5C\u68AF\u5B50\n# \u4E0B\u9762\u7684\u90E8\u5206\u8F6F\u4EF6\u5305\u662F\u5B89\u88C5\u4E0D\u4E86\u7684,\u5FC5\u987B\u9700\u8981\u68AF\u5B50,\u5728\u542F\u52A8 lantern \u540E,\u53EF\u901A\u8FC7\u4EE5\u4E0B\u547D\u4EE4\u5B89\u88C5 google-chrome\n# https_proxy=127.0.0.1:8787 brew cask install google-chrome\nbrew cask install lantern\n\n# \u57FA\u7840\u7A0B\u5E8F\nbrew install openssh autossh git mosh bash sshrc ssh-copy-id sshuttle tmux vim\n\n# Linux/GNU \u547D\u4EE4\n# \u8FD9\u4E9B gnu \u547D\u4EE4\u90FD\u6CA1\u7528 --with-default-names \u53C2\u6570,\u56E0\u6B64\u547D\u4EE4\u4F1A\u63A8\u8350\u4E00\u4E2A g \u524D\u7F00,\u4F8B\u5982 gawk\n# \u4F7F\u7528\u7684\u65F6\u5019\u6DFB\u52A0 /usr/local/opt/coreutils/libexec/gnubin \u8BE5\u8DEF\u5F84\u5C31\u53EF\u4EE5\u4E86, \u4E0D\u9700\u8981 g \u524D\u7F00\nbrew install less nano file-formula findutils coreutils binutils diffutils wget rsync unzip gzip wdiff\nbrew install gnu-{indent,sed,tar,which,units,time} gnutls gpatch grep\nbrew install bash-completion2\n\n# \u57FA\u672C\u8BED\u8A00\u73AF\u5883, \u53EF\u9009\u88C5\n# \u5982\u679C\u4F7F\u7528 nvm \u5219\u4E0D\u5B89\u88C5 node\n# python \u9ED8\u8BA4\u4E3A 3 \u53EF\u540C\u65F6\u5B89\u88C5 python@2\nbrew install ruby python go node\n# \u8865\u5168\nbrew install {pip,ruby,gem,bundler,open,maven,brew-cask,apm-bash}-completion\n\n# Java \u73AF\u5883\n# \u4E0D\u5EFA\u8BAE\u901A\u8FC7 brew \u5B89\u88C5 java \u56E0\u4E3A\u6309\u4F4F\u7684\u662F\u6700\u65B0\u7248\uFF0C\u5EFA\u8BAE\u81EA\u884C\u5B89\u88C5 LTS \u7248\n# brew cask install java\n# \u6700\u65B0 beta \u7248\u53EF\u5B89\u88C5 homebrew/cask-versions/java-beta\nbrew install maven\n# \u5EFA\u8BAE\u901A\u8FC7 toolbox \u5B89\u88C5 jetbrain \u7684 ide\n# brew cask install intellij-idea\n\n# \u6570\u636E\u5E93\n# \u53EF\u9009 mongodb mysql mariadb postgresql\nbrew install sqlite\n\n# \u65E5\u5E38\u5DE5\u5177\nbrew cask install iterm2 google-chrome atom\n# xtrafinder \u5728 10.11 \u4E2D\u9700\u8981\u989D\u5916\u914D\u7F6E\u624D\u80FD\u4F7F\u7528\n# FinderPath \u65E0\u6CD5\u901A\u8FC7 cask \u5B89\u88C5\n\n# Java \u73AF\u5883\nbrew cask install java7 java\nbrew install maven\nbrew cask install intellij-idea\n\n# OS X \u4E0B\u7684\u5E38\u7528\u5DE5\u5177\n# \u4E5F\u53EF\u4EE5\u7528 AppleScript \u63D0\u4F9B\u7684\u547D\u4EE4\u5B9E\u73B0 https://developer.apple.com/library/mac/documentation/AppleScript/Conceptual/AppleScriptLangGuide/reference/ASLR_cmds.html#//apple_ref/doc/uid/TP40000983-CH216-SW224\nbrew install terminal-notifier\n\n# \u5728\u4E2D\u56FD\u7684\u57FA\u672C\u5DE5\u5177\n# \u5982\u679C\u4E60\u60EF\u82F9\u679C\u7684\u8F93\u5165\u6CD5\u53EF\u4EE5\u8003\u8651\u4E0D\u5B89\u88C5 \u641C\u72D7\nbrew cask install qq sogouinput\nopen /opt/homebrew-cask/Caskroom/sogouinput/*/\u5B89\u88C5\u641C\u72D7\u8F93\u5165\u6CD5.app\n# \u4E5F\u53EF\u4EE5\u5B89\u88C5\u767E\u5EA6\u4E91 baiducloud\n# brew cask install baiducloud\n\n# \u5A31\u4E50\u76F8\u5173\u7A0B\u5E8F\nbrew install youtube-dl ffmpeg cmus\nbrew install mpv # \u53EA\u662F\u547D\u4EE4\u884C\u542F\u52A8,\u672A\u5173\u8054\u6587\u4EF6, mpv --profile=pseudo-gui \u53EF\u542F\u52A8\u4F2A UI\n# mpv \u7684 app\nbrew cask install mpv\n\n# \u5E38\u7528\u8F85\u52A9\u5DE5\u5177\nbrew install di pv jlhonora/lsusb/lsusb\n\n# \u5C0F\u5DE5\u5177\nbrew install archey cmatrix cowsay fortune screenfetch sl\n\n# \u5C0F\u6E38\u620F\nbrew install c2048\n"})}),"\n",(0,r.jsx)(n.h3,{id:"\u66F4\u6539\u9ED8\u8BA4-shell",children:"\u66F4\u6539\u9ED8\u8BA4 SHELL"}),"\n",(0,r.jsx)(n.p,{children:"OS X \u81EA\u5E26\u7684 Bash \u662F 3 \u7684,\u6709\u4E9B\u529F\u80FD\u4E0D\u652F\u6301,\u4F7F\u7528 Brew \u5B89\u88C5\u7684\u662F\u6700\u65B0\u7248\u7684 Bash, \u53EF\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u4FEE\u6539\u64CD\u4F5C\u7CFB\u7EDF\u9ED8\u8BA4 SHELL"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"echo /usr/local/bin/bash | sudo tee -a /etc/shells\nchsh -s /usr/local/bin/bash\n"})}),"\n",(0,r.jsx)(n.h3,{id:"font",children:"Font"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u6DFB\u52A0\u5B57\u4F53\u5E93\nbrew tap caskroom/fonts\n# \u641C\u7D22\u5B57\u4F53\n# brew cask search /monoid/ # \u652F\u6301 ligature \u7684\u7F16\u7A0B\u5B57\u4F53\n# brew cask search /noto/ # \u8C37\u6B4C\u7684 noto \u5B57\u4F53\n# brew cask install font-noto-emoji font-noto-color-emoji font-noto-sans-cjk-sc\n# fc-list : file family |grep \\/Library # \u67E5\u770B\u5B89\u88C5\u7684\u5B57\u4F53\n"})}),"\n",(0,r.jsx)(n.h3,{id:"fuse",children:"FUSE"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Filesystem_in_Userspace",children:"FUSE"})," \u662F ",(0,r.jsx)(n.a,{href:"https://zh.wikipedia.org/wiki/FUSE",children:"\u7528\u6237\u7A7A\u95F4\u6587\u4EF6\u7CFB\u7EDF"}),",\u6BD4\u8F83\u5E38\u89C1\u7684\u4F7F\u7528\u60C5\u51B5"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u5C06\u8FDC\u7A0B\u670D\u52A1\u5668\u901A\u8FC7 SFTP \u6216\u8005 FTP \u6302\u5728\u5230\u672C\u5730"}),"\n",(0,r.jsx)(n.li,{children:"\u6DFB\u52A0\u64CD\u4F5C\u7CFB\u7EDF\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7CFB\u7EDF\u7C7B\u578B\u652F\u6301"}),"\n",(0,r.jsx)(n.li,{children:"\u6587\u4EF6\u7CFB\u7EDF\u52A0\u5BC6"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# OS X \u81EA\u8EAB\u6CA1\u6709 FUSE \u652F\u6301,\u9700\u8981\u989D\u5916\u5B89\u88C5 osxfuse\nbrew cask install osxfuse\n\n# \u6DFB\u52A0 fuse \u4ED3\u5E93\n# \u6240\u6709\u652F\u6301\u7684 fs \u53EF\u5728 https://github.com/Homebrew/homebrew-fuse/tree/master/Formula \u770B\u5230\nbrew tap homebrew/fuse\n\n# \u4F7F\u7528\u65B9\u5F0F sshfs HOST:/opt ~/mnt \u5C06\u4E3B\u673A\u7684 /opt \u76EE\u5F55\u6620\u5C04\u5230\u672C\u5730\u7684 ~/mnt\nbrew install sshfs\n\n# \u7528\u4E8E\u76EE\u5F55\u6620\u5C04, OS X \u4E0B HFS+ \u6709\u6587\u4EF6\u76EE\u5F55\u7684\u786C\u94FE\u63A5,\u4F46\u53EA\u80FD\u662F\u540C\u78C1\u76D8\nbrew install bindfs\n# \u652F\u6301 MTP, \u5927\u591A\u6570\u662F\u60F3\u64CD\u4F5C\u624B\u673A\u6587\u4EF6\u7684\u65F6\u5019, OS X \u65E0\u6CD5\u76F4\u63A5\u64CD\u4F5C, Windows \u81EA\u5E26 MTP \u652F\u6301\n# simple-mtpfs --list-devices # \u67E5\u770B\u6240\u6709\u8BBE\u5907\n# simple-mtpfs --device 1  ~/mnt/android/ # \u6302\u8F7D\u8BBE\u5907\u53F7\u4E3A 1 \u7684 mtp \u5230 ~/mnt/android/\nbrew install simple-mtpfs\n\n# \u52A0\u5BC6\u7684\u6587\u4EF6\u7CFB\u7EDF\n# encfs ~/data/enc ~/mnt/enc # \u5C06 ~/data/enc \u4F5C\u4E3A\u52A0\u5BC6\u6570\u636E\u7684\u5B58\u50A8\u76EE\u5F55, ~/mnt/enc \u4E3A\u6302\u8F7D\u70B9\n# \u7B2C\u4E00\u6B21\u6267\u884C\u65F6\u9009\u62E9 p \u8FDB\u5165\u9884\u7F6E\u6A21\u5F0F,\u7136\u540E\u8F93\u5165\u5BC6\u7801,\u4E4B\u540E\u6302\u8F7D\u7684\u65F6\u5019\u90FD\u9700\u8981\u8F93\u5165\u5BC6\u7801\nbrew install encfs\n\n# \u5C06 zip \u6302\u8F7D\u4E3A\u4E00\u4E2A\u6587\u4EF6\u76EE\u5F55\n# fuse-zip data.zip ~/mnt/zip/\nbrew install fuse-zip\n# \u5C06\u5F52\u6863\u6587\u4EF6\u6302\u8F7D\u4E3A\u6587\u4EF6\u76EE\u5F55\nbrew install avfs\n# \u5C06 BT \u79CD\u5B50\u6302\u8F7D\u4E3A\u76EE\u5F55\nbrew install btfs\n"})}),"\n",(0,r.jsx)(n.h3,{id:"tex",children:"Tex"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'# \u5B8C\u6574\u7684 MacTex \u76F8\u5F53\u5927,\u53EF\u4EE5\u53EA\u5B89\u88C5 BasicTex \u7136\u540E\u901A\u8FC7 tlmgr \u5B89\u88C5\u989D\u5916\u7684\u5305\n# http://www.tug.org/mactex/morepackages.html\n# export PATH="$PATH:/Library/TeX/texbin/"\n# tlmgr update --self\n# tlmgr install collection-fontsrecommended\nbrew cask install basictex\n'})}),"\n",(0,r.jsx)(n.h3,{id:"php",children:"PHP"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/Homebrew/homebrew-php",children:"homebrew-php"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew tap homebrew/dupes\nbrew tap homebrew/versions\nbrew tap homebrew/homebrew-php\n# \u5B89\u88C5\u9700\u8981\u7684\u7248\u672C\nbrew install php56\n"})}),"\n",(0,r.jsxs)(n.p,{children:["\u591A\u7248\u672C PHP \u53EF\u4F7F\u7528 ",(0,r.jsx)(n.a,{href:"https://github.com/wilmoore/php-version",children:"php-version"})," \u63A7\u5236"]}),"\n",(0,r.jsx)(n.h3,{id:"\u5BB9\u5668\u76F8\u5173",children:"\u5BB9\u5668\u76F8\u5173"}),"\n",(0,r.jsx)(n.p,{children:"\u5982\u679C\u60F3\u8981\u4F7F\u7528\u4F8B\u5982 Docker \u4E4B\u7C7B\u7684\u5BB9\u5668\u6280\u672F,\u53EF\u5B89\u88C5\u4E0B\u5217\u8F6F\u4EF6\u5305"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u57FA\u7840 Docker \u4F9D\u8D56\nbrew install docker docker-machine docker-machine-driver-xhyve docker-compose docker-swarm\nbrew cask install virtualbox vagrant\n\nbrew install {docker,docker-machine,docker-compose,vagrant}-completion docker-machine-completion\n"})}),"\n",(0,r.jsx)(n.h2,{id:"linuxbrew",children:"Linuxbrew"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.a,{href:"http://linuxbrew.sh/",children:"Linuxbrew"})," \u662F Brew \u7684 Linux \u79FB\u690D\u7248, \u652F\u6301\u5927\u591A\u7684\u5B89\u88C5\u5305."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# Ubuntu \u4F9D\u8D56\nsudo apt-get install build-essential curl git m4 python-setuptools ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev\n\n# Centos \u4F9D\u8D56\nsudo yum groupinstall 'Development Tools' && sudo yum install curl git irb m4 python-setuptools ruby texinfo bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel\n\n# \u5B89\u88C5 Linuxbrew\nruby -e \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)\"\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u4F7F\u7528-gcc-\u800C\u4E0D\u4F7F\u7528-clang",children:"\u4F7F\u7528 gcc \u800C\u4E0D\u4F7F\u7528 clang"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /usr/local/bin\nVER=8\nfor v in gcc c++ g++ cpp; do ln -s $v-$VER $v; done\n\n# \u6062\u590D\nfor v in gcc c++ g++ cpp; do unlink $v; done\n"})}),"\n",(0,r.jsx)(n.h2,{id:"formula",children:"formula"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew --prefix tinc-pre # /usr/local/opt/tinc-pre\nbrew --cellar tinc-pre # /usr/local/Cellar/tinc-pre\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://formulae.brew.sh/api/formula.json",children:"https://formulae.brew.sh/api/formula.json"})}),"\n",(0,r.jsx)(n.li,{children:"~/Library/Caches/Homebrew/api/formula.json"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"tap",children:"tap"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"tap \u591A\u4E86 update \u4F1A\u5F88\u6162"}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"https://github.com/<user>/homebrew-<repo>"})}),"\n",(0,r.jsx)(n.li,{children:"homebrew/cask"}),"\n",(0,r.jsx)(n.li,{children:"homebrew/core"}),"\n",(0,r.jsx)(n.li,{children:"homebrew/services"}),"\n",(0,r.jsxs)(n.li,{children:["cloudflare/cloudflare\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"cloudflared"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:"heroku/brew"}),"\n",(0,r.jsxs)(n.li,{children:["ariga/tap\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"atlas"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["joedrago/repo\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"avifenc"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["jlhonora/lsusb\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"lsusb"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"ls $(brew --repository)/Library/Taps\n"})}),"\n",(0,r.jsx)(n.h2,{id:"\u8BBE\u7F6E",children:"\u8BBE\u7F6E"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"HOMEBREW_NO_AUTO_UPDATE"}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(n.h2,{id:"\u7F13\u5B58\u76EE\u5F55",children:"\u7F13\u5B58\u76EE\u5F55"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Homebrew\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"~/Library/Caches/Homebrew"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"/usr/local/Hombrew"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["Cask\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u65E9\u671F\u5B58\u50A8\u4E8E ",(0,r.jsx)(n.code,{children:"/opt/homebrew-cask/Caskroom/"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u540E\u8FC1\u79FB\u81F3 ",(0,r.jsx)(n.code,{children:"/usr/local/Caskroom/"})]}),"\n",(0,r.jsxs)(n.li,{children:["\u518D\u540E\u6765 ",(0,r.jsx)(n.code,{children:"/usr/local/Hombrew/Cask"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u624B\u52A8\u4E0B\u8F7D\u672A\u4E0B\u8F7D\u5B8C\u6210\u7684\u5B89\u88C5\u5305",children:"\u624B\u52A8\u4E0B\u8F7D\u672A\u4E0B\u8F7D\u5B8C\u6210\u7684\u5B89\u88C5\u5305"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"cd /Library/Caches/Homebrew/\nfor f in $(echo *.incomplete); do\n  echo Manual download ${f%.incomplete}\n  aria2c -c -j 10 https://homebrew.bintray.com/bottles/${f%.incomplete} && rm $f\ndone\n"})}),"\n",(0,r.jsx)(n.h2,{id:"xcode-\u7248\u672C\u68C0\u6D4B\u9519\u8BEF",children:"xcode \u7248\u672C\u68C0\u6D4B\u9519\u8BEF"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u663E\u793A\u5F53\u524D\u4F7F\u7528\u7684\u7248\u672C\nxcode-select -p\n# \u5207\u6362\u4E3A\u53E6\u5916\u7684\u7248\u672C\nsudo xcode-select --switch /Applications/Xcode.app/Contents/Developer\n"})}),"\n",(0,r.jsx)(n.h2,{id:"dir_s_mkdir-permission-denied",children:"dir_s_mkdir permission denied"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://github.com/Homebrew/homebrew-core/issues/19789",children:"#19789"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew link ruby -- dir_s_mkdir permission denied\nfind /usr/local -not -uid $(id -u)\nfind /usr/local -not -uid $(id -u) | xargs -n 1 sudo chown -R $(whoami)\n"})}),"\n",(0,r.jsx)(n.h2,{id:"openjdk",children:"openjdk"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'sudo ln -sfn /usr/local/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk\n# export PATH="/usr/local/opt/openjdk/bin:$PATH"\n'})}),"\n",(0,r.jsx)(n.h2,{id:"\u8FC1\u79FB",children:"\u8FC1\u79FB"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew list > formulas.txt\n\nbrew fetch $(cat formulas.txt)\nbrew unlink $(cat formulas.txt)\nbrew link --overwrite $(cat formulas.txt)\nbrew reinstall $(cat formulas.txt)\n\nbrew doctor check_for_stray_headers\nbrew doctor check_for_stray_headers 2>&1 | grep /protobuf | xargs rm\nbrew doctor check_for_stray_headers 2>&1 | grep '^  /' | xargs rm\n\nbrew doctor check_for_stray_static_libs\nbrew doctor check_for_stray_static_libs 2>&1 | grep '^  /' | xargs rm\n\nbrew doctor check_for_stray_dylibs\nbrew doctor check_for_stray_dylibs 2>&1 | grep '^  /' | xargs rm\n\nbrew prune\nbrew missing\n"})}),"\n",(0,r.jsx)(n.h2,{id:"no-such-reg",children:"no such reg"}),"\n",(0,r.jsx)(n.p,{children:"\u5378\u8F7D\u91CD\u88C5"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew uninstall --force tinc-pre\nbrew cleanup --force -s tinc-pre\nbrew cleanup --prune-prefix\nbrew install tinc-pre\n"})}),"\n",(0,r.jsx)(n.h2,{id:"cannot-download-non-corrupt",children:"Cannot download non-corrupt"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"rm ~/Library/Caches/Homebrew/downloads/*\nbrew update\n"})}),"\n",(0,r.jsx)(n.h2,{id:"formulajson-update-failed-falling-back-to-cached-version",children:"formula.json: update failed, falling back to cached version."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew update\n"})}),"\n",(0,r.jsx)(n.h2,{id:"brew-40",children:"brew 4.0"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'export HOMEBREW_NO_ANALYTICS=1\n\nbrew untap homebrew/core\nbrew untap homebrew/cask\n\n# 4.0 HOMEBREW_INSTALL_FROM_API \u9ED8\u8BA4\n# HOMEBREW_NO_INSTALL_FROM_API=1\n\nexport HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"\nexport HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"\nexport HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"\n# 4.0+ \u4E0D\u5F00\u53D1\u4E0D\u9700\u8981\nexport HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"\nexport HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"\nbrew update\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["JSON \u66FF\u4EE3 Git\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://formulae.brew.sh/",children:"https://formulae.brew.sh/"})}),"\n",(0,r.jsxs)(n.li,{children:["HOMEBREW_API_DOMAIN\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\u4EE5\u524D ",(0,r.jsx)(n.code,{children:"HOMEBREW_{ARTIFCAT,BOTTLE}_DOMAIN"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://brew.sh/2023/02/16/homebrew-4.0.0/",children:"https://brew.sh/2023/02/16/homebrew-4.0.0/"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u8FC1\u79FB-1",children:"\u8FC1\u79FB"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew bundle dump\n# brew & vsc\ncat Brewfile\n\nbrew bundle install --file /path/to/Brewfile\n"})}),"\n",(0,r.jsx)(n.h2,{id:"analytics",children:"analytics"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"brew analytics # \u5F53\u524D\u72B6\u6001\n\nexport HOMEBREW_NO_ANALYTICS=1\n# \u6216\nbrew analytics off\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://docs.brew.sh/Analytics",children:"https://docs.brew.sh/Analytics"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return a}});var l=s(75271);let r={},i=l.createContext(r);function a(e){let n=l.useContext(i);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),l.createElement(i.Provider,{value:n},e.children)}}}]);