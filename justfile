[private]
@default:
  just --list --justfile {{justfile()}}

# Show git status with color
status:
    git add -u && git diff --color=always --staged --stat | tee

# Pull current branch with rebase and autostash
pull:
    git pull --rebase --autostash origin `git branch --show-current`

# Install TikZ dependencies
prepare-tikz:
    apk add texlive icu-data-full texmf-dist-latexextra texmf-dist-langchinese texmf-dist-pictures
    apk add -X http://mirrors.aliyun.com/alpine/edge/testing pdf2svg

# Convert TikZ files to SVG
tikz:
    time node ./site/dist/scripts/tikz2svg.js ./notes/courses/cs221/assets/*.tikz

# Optimize SVG files
svgo:
    pnpm svgo ./notes/courses/cs221/assets/*.svg

hello name:
    @echo "Hello, {{name}} !"

ls-assets:
  git ls-files | grep -v -E '.(mdx?|png|jpe?g|svg|pdf|fountain|ya?ml|sql|tikz|txt|sh)$'
