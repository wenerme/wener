//绘制点
CanvasRenderingContext2D.prototype.pixel = function(x, y, color) {
    var tempStyle = this.fillStyle;
    this.fillStyle = color;
    this.fillRect(x, y, 1, 1);
    this.fillStyle = tempStyle;
};
//绘制像素直线，无抗锯齿
CanvasRenderingContext2D.prototype.line = function(x0, y0, x1, y1, color) {
    var tempStyle = this.fillStyle;
    this.fillStyle = color;

    var dx, dy, i, e, x, y;
    (dx = x1 - x0), (dy = y1 - y0), (e = dy * 2 - dx);
    (x = x0), (y = y0);
    for (i = 0; i <= dy; i++) {
        this.fillRect(x, y, 1, 1);
        x++;

        if (e >= 0) {
            y++;
            e = e + 2 * (dy - dx);
        } else e = e + 2 * dy;
    }

    this.fillStyle = tempStyle;
};
//获取某一点的颜色
CanvasRenderingContext2D.prototype.getPixel = function(x, y) {
    var data = this.getImageData(x, y, 1, 1).data;
    return (data[3] << 24) | (data[0] << 16) | (data[1] << 8) | data[2];
};
//Graphice Class
//这里定义一个我用来学习图形学的类

function Graph() {
    this.$ = document.createElement('canvas').getContext('2d');
}

Graph.prototype = {
    Pixel: function(x, y, color) {
        var tempStyle = this.$.fillStyle;
        this.$.fillStyle = color;
        this.$.fillRect(x, y, 1, 1);
        this.$.fillStyle = tempStyle;
    },
    GetPixel: function(x, y) {
        var data = this.$.getImageData(x, y, 1, 1).data;
        return (data[3] << 24) | (data[0] << 16) | (data[1] << 8) | data[2];
    },
    Line: function(x0, y0, x1, y1, color) {
        var ctx = this.$;
        var tempStyle = ctx.fillStyle;
        ctx.fillStyle = color;

        var dx, dy, i, e, x, y;
        (dx = x1 - x0), (dy = y1 - y0), (e = dy * 2 - dx);
        (x = x0), (y = y0);
        for (i = 0; i <= dy; i++) {
            ctx.fillRect(x, y, 1, 1);
            x++;

            if (e >= 0) {
                y++;
                e = e + 2 * (dy - dx);
            } else e = e + 2 * dy;
        }

        ctx.fillStyle = tempStyle;
    },
    Circle: function(cx, cy, r, color) {
        var ctx = this.$;
        var tempStyle = ctx.fillStyle;
        ctx.fillStyle = color;

        var x, y, e;
        (x = 0), (y = r), (e = 1 - r);
        //绘制初始的8点
        ctx.fillRect(cx + x, cy + y, 1, 1), ctx.fillRect(cy + y, cx + x, 1, 1);
        ctx.fillRect(cx - x, cy + y, 1, 1), ctx.fillRect(cy + y, cx - x, 1, 1);
        ctx.fillRect(cx + x, cy - y, 1, 1), ctx.fillRect(cy - y, cx + x, 1, 1);
        ctx.fillRect(cx - x, cy - y, 1, 1), ctx.fillRect(cy - y, cx - x, 1, 1);

        while (x <= y) {
            if (e < 0) e += 2 * x + 3;
            else {
                e += 2 * (x - y) + 5;
                y--;
            }
            x++;
            ctx.fillRect(cx + x, cy + y, 1, 1),
                ctx.fillRect(cy + y, cx + x, 1, 1);
            ctx.fillRect(cx - x, cy + y, 1, 1),
                ctx.fillRect(cy + y, cx - x, 1, 1);
            ctx.fillRect(cx + x, cy - y, 1, 1),
                ctx.fillRect(cy - y, cx + x, 1, 1);
            ctx.fillRect(cx - x, cy - y, 1, 1),
                ctx.fillRect(cy - y, cx - x, 1, 1);
        }

        ctx.fillStyle = tempStyle;
    },
    /*
var ctx = this.$;
var tempStyle = ctx.fillStyle;
	ctx.fillStyle = color;
	ctx.fillRect( x, y, 1, 1);
	ctx.fillStyle = tempStyle;
*/
    Ellipes: function(cx, cy, a, b, color) {
        var ctx = this.$;
        var tempStyle = ctx.fillStyle;
        ctx.fillStyle = color;

        var aa = a * a,
            bb = b * b;
        var twoaa = 2 * aa,
            twobb = 2 * bb;
        var x = 0,
            y = b;
        var d,
            dx = 0,
            dy = twoaa * y;

        d = Math.round(bb + aa * (-b + 0.25) + 0.5);

        ctx.fillRect(cx + x, cy + y, 1, 1);
        ctx.fillRect(cx - x, cy + y, 1, 1);
        ctx.fillRect(cx + x, cy - y, 1, 1);
        ctx.fillRect(cx - x, cy - y, 1, 1);

        while (dx < dy) {
            x++;
            dx += twobb;
            if (d < 0) d += bb + dx;
            else {
                dy -= twoaa;
                d += bb + dx - dy;
                y--;
            }

            ctx.fillRect(cx + x, cy + y, 1, 1);
            ctx.fillRect(cx - x, cy + y, 1, 1);
            ctx.fillRect(cx + x, cy - y, 1, 1);
            ctx.fillRect(cx - x, cy - y, 1, 1);
        }

        d = Math.round(
            bb * (x + 0.5) * (x + 0.5) + aa * (y - 1) * (y - 1) - aa * bb + 0.5,
        );
        while (y > 0) {
            y--;
            dy -= twoaa;
            if (d > 0) d += aa - dy;
            else {
                x++;
                dx += twobb;
                d += aa - dy + dx;
            }
            ctx.fillRect(cx + x, cy + y, 1, 1);
            ctx.fillRect(cx - x, cy + y, 1, 1);
            ctx.fillRect(cx + x, cy - y, 1, 1);
            ctx.fillRect(cx - x, cy - y, 1, 1);
        }

        ctx.fillStyle = tempStyle;
    },
    //边界表示区域填充BoundaryColor 为整数值 new为字符串
    BoundaryFill4: function(ox, oy, BoundaryColor, newColor) {
        var ctx = this.$;

        var color = ctx.getPixel(ox, oy);

        if (color != BoundaryColor && color != newColor) {
            ctx.pixel(x, y, newColor);
            ctx.BoundaryFill4(x, y + 1, BoundaryColor, newColor);
            ctx.BoundaryFill4(x, y - 1, BoundaryColor, newColor);
            ctx.BoundaryFill4(x + 1, y, BoundaryColor, newColor);
            ctx.BoundaryFill4(x - 1, y, BoundaryColor, newColor);
        }
    },
    //4联通区域填充的一个点的填充过程 oldColor 为整数值 new为字符串
    FloodFill4: function(x, y, oldColor, newColor) {
        var ctx = this.$;
        if (this.GetPixel(x, y) == oldColor) {
            this.Pixel(x, y, newColor);
            this.FloodFill4(x, y + 1, oldColor, newColor);
            this.FloodFill4(x, y - 1, oldColor, newColor);
            this.FloodFill4(x + 1, y, oldColor, newColor);
            this.FloodFill4(x - 1, y, oldColor, newColor);
        }
    },
    //扫描线种子填充算法
    Fill: function(x, y, newColor) {
        var xl,
            xr,
            i,
            stack = new Array(),
            pt = new Object();
        var spanNeedFill;
        (pt.x = x), (pt.y = y);
        stack.push(pt);
        var oldColor = this.GetPixel(x, y);

        if (oldColor == newColor) stack = new Array();
        //栈不为空
        while (stack.length) {
            pt = stack.pop();
            (y = pt.y), (x = pt.x);

            while (this.GetPixel(x, y) == oldColor) {
                //向右填充
                this.Pixel(x, y, newColor);
                x++;
            }
            xr = x - 1;

            x = pt.x - 1;
            while (this.GetPixel(x, y) == oldColor) {
                //向左填充
                this.Pixel(x, y, newColor);
                x--;
            }
            xl = x + 1;

            // 处理上一条扫描线
            (x = xl), (y = y - 1);
            while (x < xr) {
                spanNeedFill = false;
                while (this.GetPixel(x, y) == oldColor) {
                    spanNeedFill = true;
                    x++;
                }

                if (spanNeedFill) {
                    //pt.x = x - 1, pt.y = y;
                    stack.push({x: x - 1, y: y}); //这里需要注意呀！！！！pt是引用而不是复制！！！！！！所以压入的时候得需要新的
                    //console.log( stack)
                    spanNeedFill = false;
                }

                while (this.GetPixel(x, y) != oldColor && x < xr) x++;
            }

            //处理下一条扫描线 因为上面-1 所以这里+2
            (x = xl), (y = y + 2);
            while (x < xr) {
                spanNeedFill = false;
                while (this.GetPixel(x, y) == oldColor) {
                    spanNeedFill = true;
                    x++;
                }

                if (spanNeedFill) {
                    //pt.x = x - 1, pt.y = y;
                    stack.push({x: x - 1, y: y});
                    spanNeedFill = false;
                }

                while (this.GetPixel(x, y) != oldColor && x < xr) x++;
            }
        }
    },

    //图案填充 pattern为ImageData类
    PatternFill: function(x, y, pattern) {
        var xl,
            xr,
            i,
            stack = new Array(),
            pt = new Object();
        var pWidth = pattern.width,
            pHeight = pattern.height; //取出图案大小
        var newColor = {width: 1, height: 1, data: []};
        var spanNeedFill;
        (pt.x = x), (pt.y = y);
        stack.push(pt);
        var oldColor = this.GetPixel(x, y);

        //栈不为空
        while (stack.length) {
            pt = stack.pop();
            (y = pt.y), (x = pt.x);

            while (this.GetPixel(x, y) == oldColor) {
                //向右填充
                this.$.putImageData(
                    pattern,
                    x - (x % pWidth),
                    y - (y % pHeight),
                    x % pWidth,
                    y % pHeight,
                    1,
                    1,
                );
                x++;
            }
            xr = x - 1;

            x = pt.x - 1;
            while (this.GetPixel(x, y) == oldColor) {
                //向左填充
                this.$.putImageData(
                    pattern,
                    x - (x % pWidth),
                    y - (y % pHeight),
                    x % pWidth,
                    y % pHeight,
                    1,
                    1,
                );
                x--;
            }
            xl = x + 1;

            // 处理上一条扫描线
            (x = xl), (y = y - 1);
            while (x < xr) {
                spanNeedFill = false;
                while (this.GetPixel(x, y) == oldColor) {
                    spanNeedFill = true;
                    x++;
                }

                if (spanNeedFill) {
                    //pt.x = x - 1, pt.y = y;
                    stack.push({x: x - 1, y: y}); //这里需要注意呀！！！！pt是引用而不是复制！！！！！！所以压入的时候得需要新的
                    //console.log( stack)
                    spanNeedFill = false;
                }

                while (this.GetPixel(x, y) != oldColor && x < xr) x++;
            }

            //处理下一条扫描线 因为上面-1 所以这里+2
            (x = xl), (y = y + 2);
            while (x < xr) {
                spanNeedFill = false;
                while (this.GetPixel(x, y) == oldColor) {
                    spanNeedFill = true;
                    x++;
                }

                if (spanNeedFill) {
                    //pt.x = x - 1, pt.y = y;
                    stack.push({x: x - 1, y: y});
                    spanNeedFill = false;
                }

                while (this.GetPixel(x, y) != oldColor && x < xr) x++;
            }
        }
    },

    //Parallel 平移
    Tranlation: function(x, y) {},
};
