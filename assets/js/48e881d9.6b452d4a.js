"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91950"],{76602:function(e,n,s){s.r(n),s.d(n,{metadata:()=>l,contentTitle:()=>t,default:()=>h,assets:()=>d,toc:()=>c,frontMatter:()=>r});var l=JSON.parse('{"id":"devops/infra/ansible/ansible-faq","title":"Ansible FAQ","description":"\u5224\u65AD file \u5B58\u5728","source":"@site/../notes/devops/infra/ansible/ansible-faq.md","sourceDirName":"devops/infra/ansible","slug":"/devops/infra/ansible/faq","permalink":"/notes/devops/infra/ansible/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/infra/ansible/ansible-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1693463269000,"frontMatter":{"title":"Ansible FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Ansible Cookbook","permalink":"/notes/devops/infra/ansible/cookbook"},"next":{"title":"Ansible Network","permalink":"/notes/devops/infra/ansible/network"}}'),i=s("52676"),a=s("79938");let r={title:"Ansible FAQ",tags:["FAQ"]},t="Ansible FAQ",d={},c=[{value:"\u5224\u65AD file \u5B58\u5728",id:"\u5224\u65AD-file-\u5B58\u5728",level:2},{value:"block &amp; when",id:"block--when",level:2},{value:"block \u4E0D\u652F\u6301 loop",id:"block-\u4E0D\u652F\u6301-loop",level:2},{value:"\u5E38\u7528\u4F9D\u8D56\u7EC4\u4EF6",id:"\u5E38\u7528\u4F9D\u8D56\u7EC4\u4EF6",level:2},{value:"The <code>lxml</code> module is not importable. Check the requirements.",id:"the-lxml-module-is-not-importable-check-the-requirements",level:2},{value:"include vs import",id:"include-vs-import",level:2},{value:"raw vs command vs shell",id:"raw-vs-command-vs-shell",level:2},{value:"psycopg2 ld: library not found for -lssl",id:"psycopg2-ld-library-not-found-for--lssl",level:2},{value:"winrm",id:"winrm",level:2},{value:"synchronize \u4E0D\u652F\u6301 ProxyCommand",id:"synchronize-\u4E0D\u652F\u6301-proxycommand",level:2},{value:"\u4F7F\u7528 dotenv",id:"\u4F7F\u7528-dotenv",level:2},{value:"\u83B7\u53D6\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55",id:"\u83B7\u53D6\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55",level:2},{value:"json \u6587\u4EF6\u4F5C\u4E3A\u53D8\u91CF",id:"json-\u6587\u4EF6\u4F5C\u4E3A\u53D8\u91CF",level:2},{value:"gitlab - got an unexpected keyword argument &#39;email&#39;",id:"gitlab---got-an-unexpected-keyword-argument-email",level:2},{value:"\u6D4B\u8BD5 docker \u6A21\u5757",id:"\u6D4B\u8BD5-docker-\u6A21\u5757",level:2},{value:"macOS \u4F7F\u7528 hasi_vault \u5B89\u88C5 hvac \u95EE\u9898",id:"macos-\u4F7F\u7528-hasi_vault-\u5B89\u88C5-hvac-\u95EE\u9898",level:2},{value:"2.9.0 \u4F7F\u7528 hashi_vault \u8FD4\u56DE\u7ED3\u679C\u7ED3\u6784\u4E0D\u5BF9",id:"290-\u4F7F\u7528-hashi_vault-\u8FD4\u56DE\u7ED3\u679C\u7ED3\u6784\u4E0D\u5BF9",level:2},{value:"objc: +[__NSCFConstantString initialize] may have been in progress in another thread when fork() was called.",id:"objc-__nscfconstantstring-initialize-may-have-been-in-progress-in-another-thread-when-fork-was-called",level:2},{value:"\u751F\u6210 UUID",id:"\u751F\u6210-uuid",level:2},{value:"\u5FEB\u901F\u83B7\u53D6\u5730\u5740",id:"\u5FEB\u901F\u83B7\u53D6\u5730\u5740",level:2},{value:"has no attribute &#39;ansible_default_ipv4&#39;, &#39;address&#39;",id:"has-no-attribute-ansible_default_ipv4-address",level:2},{value:"Java \u73AF\u5883\u4E0D\u6B63\u786E\u6216\u6CA1\u6709",id:"java-\u73AF\u5883\u4E0D\u6B63\u786E\u6216\u6CA1\u6709",level:2},{value:"Aborting, target uses selinux but python bindings aren&#39;t installed!",id:"aborting-target-uses-selinux-but-python-bindings-arent-installed",level:2},{value:"env &#39;python&#39; no such file",id:"env-python-no-such-file",level:2},{value:"\u62C6\u5206\u4E3B\u673A\u5230\u591A\u4E2A\u6587\u4EF6",id:"\u62C6\u5206\u4E3B\u673A\u5230\u591A\u4E2A\u6587\u4EF6",level:2},{value:"zfsprop was not present after being successfully set",id:"zfsprop-was-not-present-after-being-successfully-set",level:2}];function o(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"ansible-faq",children:"Ansible FAQ"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5224\u65AD-file-\u5B58\u5728",children:"\u5224\u65AD file \u5B58\u5728"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Control Host\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"is file"}),"\n",(0,i.jsx)(n.li,{children:"is not exists"}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_tests.html#testing-paths",children:"https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_tests.html#testing-paths"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"block--when",children:"block & when"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"when \u4F1A\u5728\u6BCF\u4E2A\u6B65\u9AA4\u90FD\u68C0\u6D4B - \u6EE1\u8DB3\u5219\u9000\u51FA"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"block-\u4E0D\u652F\u6301-loop",children:"block \u4E0D\u652F\u6301 loop"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u53EF\u4EE5 loop + include_task"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u5E38\u7528\u4F9D\u8D56\u7EC4\u4EF6",children:"\u5E38\u7528\u4F9D\u8D56\u7EC4\u4EF6"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{children:"module"}),(0,i.jsx)(n.th,{children:"pip"})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"postgres"}),(0,i.jsx)(n.td,{children:"psycopg2"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"vault"}),(0,i.jsx)(n.td,{children:"hvac"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"docker"}),(0,i.jsx)(n.td,{children:"docker"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"docker-compose"}),(0,i.jsx)(n.td,{children:"docker-compose"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"libvirt"}),(0,i.jsx)(n.td,{children:"libvirt-python"})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"k8s"}),(0,i.jsx)(n.td,{children:"openshift"})]})]})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# libvirt / CentOS / awx-task\nyum install libvirt-devel gcc\npip3 install libvirt-python\n\n# k8s / AlpineLinux\napk add py3-pip\npip3 install openshift\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"the-lxml-module-is-not-importable-check-the-requirements",children:["The ",(0,i.jsx)(n.code,{children:"lxml"})," module is not importable. Check the requirements."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"apk add py3-lxml\n"})}),"\n",(0,i.jsx)(n.h2,{id:"include-vs-import",children:"include vs import"}),"\n",(0,i.jsx)(n.admonition,{title:"\u5EFA\u8BAE",type:"tip",children:(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9700\u8981 ",(0,i.jsx)(n.code,{children:"when"})," \u3001\u5FAA\u73AF\u3001\u540D\u5B57\u662F\u53D8\u91CF\u65F6 \u4F7F\u7528 include"]}),"\n",(0,i.jsx)(n.li,{children:"\u9664\u6B64\u4E4B\u5916\u90FD\u4F7F\u7528 import"}),"\n"]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"# https://docs.ansible.com/ansible/latest/collections/ansible/builtin/include_tasks_module.html\n- include_tasks: tests.yml\n- include_tasks:\n    file: tests.yml\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["import\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5728\u89E3\u6790\u65F6\u5904\u7406 - \u9759\u6001"}),"\n",(0,i.jsx)(n.li,{children:"\u5EFA\u8BAE\u7528\u4E8E\u903B\u8F91\u5355\u5143 - \u4F8B\u5982\u62C6\u5206\u957F playbook"}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u80FD\u5FAA\u73AF"}),"\n",(0,i.jsxs)(n.li,{children:["\u80FD\u591F ",(0,i.jsx)(n.code,{children:"--list-tags"})," \u548C ",(0,i.jsx)(n.code,{children:"--list-tasks"})]}),"\n",(0,i.jsx)(n.li,{children:"\u53EF\u4EE5\u5BFC\u5165 playbook"}),"\n",(0,i.jsxs)(n.li,{children:["\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"when"})," \u6761\u4EF6\u4F1A\u88AB\u5E94\u7528\u5230\u6240\u6709\u5BFC\u5165\u7684 ",(0,i.jsx)(n.code,{children:"tasks"}),"\uFF0C\u5927\u591A\u6570\u65F6\u5019\u90FD\u662F\u4E0D\u671F\u671B\u7684\uFF0C\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"include"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["include\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5728\u6267\u884C\u65F6\u5904\u7406 - \u52A8\u6001"}),"\n",(0,i.jsx)(n.li,{children:"\u7528\u4E8E\u5E26\u6761\u4EF6\u7684\u60C5\u51B5"}),"\n",(0,i.jsxs)(n.li,{children:["\u53EA\u6709 include \u624D\u53EF\u4EE5 ",(0,i.jsx)(n.code,{children:"include_tasks: prerequisites_{{ ansible_os_family | lower }}.yml"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.ansible.com/ansible/latest/user_guide/playbooks_reuse_includes.html",children:"Reuse includes"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.ansible.com/ansible/devel/user_guide/playbooks_reuse.html#dynamic-vs-static",children:"dynamic vs. static"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://docs.ansible.com/ansible/latest/user_guide/playbooks_conditionals.html#applying-when-to-roles-imports-and-includes",children:"Applying \u2018when\u2019 to roles, imports, and includes"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"raw-vs-command-vs-shell",children:"raw vs command vs shell"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["shell - \u7531 ",(0,i.jsx)(n.code,{children:"/bin/sh"})," \u6267\u884C - \u56E0\u6B64\u80FD\u4F7F\u7528\u53D8\u91CF\u548C\u4E00\u4E9B\u8BED\u6CD5"]}),"\n",(0,i.jsxs)(n.li,{children:["command - \u76F4\u63A5\u6267\u884C - \u56E0\u6B64\u4E0D\u80FD\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"<"}),",",(0,i.jsx)(n.code,{children:">"}),",",(0,i.jsx)(n.code,{children:"|"}),",",(0,i.jsx)(n.code,{children:";"})," \u7B49"]}),"\n",(0,i.jsx)(n.li,{children:"raw - \u7531 ssh \u76F4\u63A5\u6267\u884C\uFF0C\u4E0D\u4F9D\u8D56 python"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"psycopg2-ld-library-not-found-for--lssl",children:"psycopg2 ld: library not found for -lssl"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u8DEF\u5F84\u6765\u81EA\u4E8E ",(0,i.jsx)(n.code,{children:"pg_config --ldflags"})]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"env LDFLAGS='-L/usr/local/lib -L/usr/local/opt/openssl/lib -L/usr/local/opt/readline/lib' $(brew --prefix ansible)/libexec/bin/pip install psycopg2\n"})}),"\n",(0,i.jsx)(n.h2,{id:"winrm",children:"winrm"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'$(brew --prefix ansible)/libexec/bin/pip install "pywinrm>=0.3.0"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"synchronize-\u4E0D\u652F\u6301-proxycommand",children:"synchronize \u4E0D\u652F\u6301 ProxyCommand"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"rsync \u4F7F\u7528 jumphost \u4F1A\u6709\u95EE\u9898\uFF0C\u53EF\u5C1D\u8BD5 sshuttle \u6216\u8005\u4F7F\u7528 copy"}),"\n",(0,i.jsx)(n.li,{children:"copy \u6BD4 rsync \u6162 - \u4E0D\u4F1A\u505A\u5DEE\u5206"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"rsync -azv -e 'ssh -o \"ProxyCommand ssh -A PROXYHOST -W %h:%p\"' foo/ dest:./foo/\n# ssh 7.4+\nrsync -azv -e 'ssh -A -J USER@PROXYHOST:PORT' foo/ dest:./foo/\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"rsync_opts: '-e XXXXX'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u4F7F\u7528-dotenv",children:"\u4F7F\u7528 dotenv"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u66F4\u63A8\u8350\u4F7F\u7528\u53D8\u91CF\u6216 vault"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cat <<CONF > .env\nexport TENANT_NAME=test\nCONF\n# \u6CE8\u610F\u4F7F\u7528 dotenv\n# https://github.com/bkeepers/dotenv\ndotenv ansible -m debug -a \'msg={{lookup("env","TENANT_NAME")}}\' localhost\n'})}),"\n",(0,i.jsx)(n.h2,{id:"\u83B7\u53D6\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55",children:"\u83B7\u53D6\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u89D2\u8272\u7B49\u76F8\u5173\u7684\u76EE\u5F55\u90FD\u662F\u76F8\u5BF9\u4E8E playbook \u7684"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"- set_fact:\n    # \u5982\u679C\u662F git\n    awd: \"{{ lookup('pipe', 'git rev-parse --show-toplevel') }}\"\n"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/ansible/ansible/issues/38771",children:"38771"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"json-\u6587\u4EF6\u4F5C\u4E3A\u53D8\u91CF",children:"json \u6587\u4EF6\u4F5C\u4E3A\u53D8\u91CF"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'- hosts: your_host\n  vars:\n    jsonVar: "{{ lookup(\'file\', \'var.json\') | from_json }}"\n  tasks:\n    - name: test loop\n      with_dict: "{{ jsonVar[\'queue\'] }}"\n      shell: |\n        if echo "blue" | grep -q "{{ item.value.color }}" ; then\n            echo "success"\n        fi\n'})}),"\n",(0,i.jsx)(n.h2,{id:"gitlab---got-an-unexpected-keyword-argument-email",children:"gitlab - got an unexpected keyword argument 'email'"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/ansible/ansible/issues/65189",children:"#65189"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"$(brew --prefix ansible)/libexec/bin/pip uninstall python-gitlab\n# \u9700\u8981\u4F4E\u7248\u672C\n$(brew --prefix ansible)/libexec/bin/pip install -U 'python-gitlab<1.13'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u6D4B\u8BD5-docker-\u6A21\u5757",children:"\u6D4B\u8BD5 docker \u6A21\u5757"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ansible -m docker_container -a 'name=test image=busybox' localhost\n\n# \u5E38\u89C4\u64CD\u4F5C\npip uninstall docker-py\npip3 uninstall docker\n\npip3 install docker\n"})}),"\n",(0,i.jsx)(n.h2,{id:"macos-\u4F7F\u7528-hasi_vault-\u5B89\u88C5-hvac-\u95EE\u9898",children:"macOS \u4F7F\u7528 hasi_vault \u5B89\u88C5 hvac \u95EE\u9898"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u5B89\u88C5\u5176\u4ED6\u5305\u4E5F\u662F\u4E00\u6837 - \u4F8B\u5982 docker"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# \u5F53\u524D\u4F7F\u7528\u7684 python\nansible -m debug -a \'var=ansible_playbook_python\' localhost\n# \u4F7F\u7528 ansible \u4E0B\u7684 pip \u5B89\u88C5\n$(brew --prefix ansible)/libexec/bin/pip install hvac\n\n# localhost | SUCCESS => {\n#     "ansible_playbook_python": "/usr/local/Cellar/ansible/2.6.0/libexec/bin/python2.7"\n# }\n# source $(brew --prefix ansible)/libexec/bin/activate\n# pip install hvac\n'})}),"\n",(0,i.jsx)(n.h2,{id:"290-\u4F7F\u7528-hashi_vault-\u8FD4\u56DE\u7ED3\u679C\u7ED3\u6784\u4E0D\u5BF9",children:"2.9.0 \u4F7F\u7528 hashi_vault \u8FD4\u56DE\u7ED3\u679C\u7ED3\u6784\u4E0D\u5BF9"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/ansible/ansible/pull/41132",children:"#41132"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u56E0\u4E3A\u8FD4\u56DE\u4E86 metadata \u548C data \u8FD8\u9700\u8981\u53D6\u9700\u8981\u7684\u5B57\u6BB5\nansible -m debug -a \"msg={{lookup('hashi_vault', 'secret=secret/data/app:data').db_password}}\" localhost\n# consul \u7684 token\nansible -m debug -a \"msg={{lookup('hashi_vault', 'secret=consul/creds/reader:token')}}\" localhost\n"})}),"\n",(0,i.jsx)(n.h2,{id:"objc-__nscfconstantstring-initialize-may-have-been-in-progress-in-another-thread-when-fork-was-called",children:"objc: +[__NSCFConstantString initialize] may have been in progress in another thread when fork() was called."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u751F\u6210-uuid",children:"\u751F\u6210 UUID"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ansible localhost -m shell -a 'uuidgen'\nansible localhost -m debug -a 'msg=\"{{ansible_date_time.iso8601_micro | to_uuid}}\"'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5FEB\u901F\u83B7\u53D6\u5730\u5740",children:"\u5FEB\u901F\u83B7\u53D6\u5730\u5740"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ansible -i hosts all -m setup\nansible -i k8s all -m debug -a 'msg={{ansible_default_ipv4.address}}'\n"})}),"\n",(0,i.jsx)(n.h2,{id:"has-no-attribute-ansible_default_ipv4-address",children:"has no attribute 'ansible_default_ipv4', 'address'"}),"\n",(0,i.jsx)(n.p,{children:"\u6B64\u65F6\u9700\u8981\u4ECE\u65B0\u6536\u96C6\u4E3B\u673A\u4FE1\u606F,\u7136\u540E\u518D\u7EE7\u7EED\u4E4B\u524D\u64CD\u4F5C"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ansible -i hosts -m setup all\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u786E\u4FDD\u8BE5\u64CD\u4F5C\u6210\u529F,\u5982\u679C\u4ECD\u7136\u8FD8\u662F\u51FA\u73B0\u6CA1\u6709",(0,i.jsx)(n.code,{children:"address"})," \u7684\u9519\u8BEF,\u90A3\u53EF\u80FD\u662F\u7531\u4E8E ansible \u65E0\u6CD5\u6536\u96C6\u5230\u9ED8\u8BA4\u5730\u5740,\u4E5F\u9700\u8981\u786E\u4FDD ",(0,i.jsx)(n.code,{children:"ifconfig"})," \u6709\u5730\u5740."]}),"\n",(0,i.jsxs)(n.p,{children:["Ansible \u662F\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"ip -4 route get 8.8.8.8"})," (\u53C2\u8003",(0,i.jsx)(n.a,{href:"https://github.com/ansible/ansible/blob/837f3dd24d2a3f6acdfcd6184d4b1830af551100/lib/ansible/module_utils/facts.py#L1939",children:"\u8FD9\u91CC"}),")"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u89E3\u51B3\u529E\u6CD5 \u53C2\u8003 ",(0,i.jsx)(n.a,{href:"http://stackoverflow.com/a/29496135/1870054",children:"\u8FD9\u91CC"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u901A\u8FC7\u624B\u52A8\u6DFB\u52A0\u8DEF\u7531\u6765\u5C1D\u8BD5\u4FEE\u6539\u8FD9\u4E2A\u95EE\u9898"}),"\n",(0,i.jsx)(n.li,{children:"\u901A\u8FC7 set_facts \u6765\u8986\u76D6\u914D\u7F6E"}),"\n",(0,i.jsx)(n.li,{children:"\u901A\u8FC7\u5B9A\u5236 facts \u6765\u5B9E\u73B0\u8BE5\u914D\u7F6E"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"java-\u73AF\u5883\u4E0D\u6B63\u786E\u6216\u6CA1\u6709",children:"Java \u73AF\u5883\u4E0D\u6B63\u786E\u6216\u6CA1\u6709"}),"\n",(0,i.jsx)(n.p,{children:"\u56E0\u4E3A\u5B89\u88C5\u90E8\u7F72\u662F\u901A\u8FC7 SSH \u8FDB\u884C\u64CD\u4F5C,\u662F\u975E\u4EA4\u4E92\u5F0F\u7684 SHELL, \u53EF\u901A\u8FC7\u4EE5\u4E0B\u547D\u4EE4\u9A8C\u8BC1\u73AF\u5883\u662F\u5426\u6B63\u786E,"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"ssh user@host 'java -version'\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u53EF\u5C06\u6240\u9700\u7684 JAVA \u73AF\u5883\u53D8\u91CF\u6DFB\u52A0\u5230 ",(0,i.jsx)(n.code,{children:"~/.bashrc"})," \u7684 ",(0,i.jsx)(n.strong,{children:"\u6700\u4E0A\u9762"}),". \u56E0\u4E3A\u975E\u4EA4\u4E92\u5F0F\u7684\u542F\u52A8\u811A\u672C\u6267\u884C\u8DEF\u5F84\u53EF\u80FD\u6709\u6240\u4E0D\u540C."]}),"\n",(0,i.jsx)(n.h2,{id:"aborting-target-uses-selinux-but-python-bindings-arent-installed",children:"Aborting, target uses selinux but python bindings aren't installed!"}),"\n",(0,i.jsx)(n.p,{children:"\u5728\u6267\u884C\u65F6\u53EF\u80FD\u9047\u5230\u4EE5\u4E0B\u9519\u8BEF"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'TASK [es : My Task] *****************************************\nfatal: [host-1]: FAILED! => {"changed": false, "checksum": "4bd3ef681e70faefe3a66c6eb3419b5d4a0e2714", "failed": true, "msg": "Aborting, target uses selinux but python bindings (libselinux-python) aren\'t installed!"}\n'})}),"\n",(0,i.jsx)(n.p,{children:"\u662F\u7531\u4E8E\u5F00\u542F\u4E86 SELinux, \u4F46\u6CA1\u6709\u5B89\u88C5 Python \u7ED1\u5B9A\u5E93\u5BFC\u81F4\u7684, \u53EA\u9700\u8981\u5B89\u88C5\u8BE5\u5E93\u5373\u53EF."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"yum install libselinux-python\n"})}),"\n",(0,i.jsx)(n.h2,{id:"env-python-no-such-file",children:"env 'python' no such file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u662F\u56E0\u4E3A\u627E\u4E0D\u5230 python - \u53EF\u80FD\u662F\u56E0\u4E3A\u4F7F\u7528\u7684 python3\nenv python\n# \u786E\u4FDD python3 \u5B58\u5728\nenv python3\n# \u521B\u5EFA\u8F6F\u94FE\u63A5\nln -s `which python3` /usr/bin/python\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u62C6\u5206\u4E3B\u673A\u5230\u591A\u4E2A\u6587\u4EF6",children:"\u62C6\u5206\u4E3B\u673A\u5230\u591A\u4E2A\u6587\u4EF6"}),"\n",(0,i.jsx)(n.p,{children:"\u76EE\u5F55\u7ED3\u6784\u53EF\u4EE5\u4E3A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"inventories/\n  a.yaml\n  b.yaml\n  c.yaml\n"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"# \u6307\u5411 inventories/ \u4F5C\u4E3A\u4ED3\u5E93\u5373\u53EF\nansible -i inventories/ all --list-hosts\n# \u9700\u8981\u7684\u65F6\u5019\u4E5F\u53EF\u4EE5\u5355\u4E2A\u6307\u5B9A\nansible -i inventories/a.yaml -i inventories/b.yaml all --list-hosts\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u76EE\u5F55\u7ED3\u6784\u4E5F\u53EF\u4EE5\u4E3A - \u9002\u7528\u4E8E\u4E0D\u540C\u73AF\u5883\u533A\u522B\u8F83\u5927\u7684\u65F6\u5019"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"inventories/\n  a/\n    hosts\n  b/\n    hosts\n"})}),"\n",(0,i.jsx)(n.h2,{id:"zfsprop-was-not-present-after-being-successfully-set",children:"zfsprop was not present after being successfully set"}),"\n",(0,i.jsx)(n.p,{children:"zfs \u64CD\u4F5C temporary \u7684\u5C5E\u6027\u6709\u95EE\u9898"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/ansible-collections/community.general/blob/baa721ac2281f9e628821863798f030c9efd4c9d/plugins/modules/storage/zfs/zfs.py#L208-L215",children:"https://github.com/ansible-collections/community.general/blob/baa721ac2281f9e628821863798f030c9efd4c9d/plugins/modules/storage/zfs/zfs.py#L208-L215"})}),"\n"]})]})}function h(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return t},a:function(){return r}});var l=s(75271);let i={},a=l.createContext(i);function r(e){let n=l.useContext(a);return l.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),l.createElement(a.Provider,{value:n},e.children)}}}]);