

```bash
Xvfb :1 -screen 0 1024x768x16 -fbdir ./fbcon/
x11vnc -display :1 -nopw -listen localhost -xkb
vncviewer localhost:5900
```




https://solarianprogrammer.com/2015/01/22/raspberry-pi-raspbian-getting-started-sdl-2/


https://stackoverflow.com/questions/25451133/xvfb-run-on-os-x



Beginning Game Programming v2.0
http://lazyfoo.net/SDL_tutorials/

https://www.libsdl.org/release/SDL-1.2.15/docs/html/sdlenvvars.html

https://wiki.libsdl.org/FAQUsingSDL

https://gist.github.com/exavolt/2360410

```
#define GL_GLEXT_PROTOTYPES
#include <GLES2/gl2.h>
#include <EGL/egl.h>
```

https://en.wikipedia.org/wiki/EGL_(API)
https://github.com/google/angle
A conformant OpenGL ES implementation for Windows, Mac and Linux. 


https://moltengl.com/

http://www.glfw.org/

```
#include <GLFW/glfw3.h>
```

https://github.com/simple2d/simple2d

https://wiki.archlinux.org/index.php/intel_graphics

https://hg.libsdl.org/SDL/file/093b58f5de3c/docs/README-raspberrypi.md
https://github.com/anholt/mesa/wiki/VC4

https://bugs.alpinelinux.org/issues/6370

https://pkgs.alpinelinux.org/package/v3.7/main/armhf/mesa


VCS
https://linux.die.net/man/4/vcs


https://en.wikipedia.org/wiki/Direct_Rendering_Manager
http://blog.csdn.net/yangkuanqaz85988/article/details/48689521


Yes. SDL 2.0.6 has an experimental KMSDRM video driver which directly gets a surface from the KMS driver. It will work without X11.

I’m assuming you are targeting the Raspberry Pi.

It’s not enabled by default (depending on the build system used) so you may have to build SDL yourself to get it. Consider disabling the SDL RPI video driver if you’re sure that it’s not going to be used. The KMSDRM and RPI drivers bite each other a bit, but this has been improved a little in a recent commit (after 2.0.7, I think).

Remember to install libgbm and its development packages as it is a dependency of the SDL KMSDRM video driver.

The option for configure is --enable-video-kmsdrm.

The CMake option is called VIDEO_KMSDRM. Interestingly, it’s enabled by default here.

Now that you have a SDL with the KMSDRM driver, check if you have vc4 enabled. The /dev/dri directory and /dev/dri/card0 file should exist and the vc4 kernel module should be loaded.

When an application loads your SDL library and initializes the video driver, it should automatically try the KMSDRM driver. You can specifically ask for it if you set the SDL_VIDEODRIVER environment variable to kmsdrm.
