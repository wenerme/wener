//BB的图片文件解析
function BBImg()
{
	this._img = new Array;
	
	
}

BBImg.prototype = {
/*	_init : function( path)
	{
	
	} ,*/
	//加载Dlx文件
	LoadDlx : function( path){
		var file = new VirtualFile;
			if( !file.LoadByURL( path))
				alert( '文件加载错误');
		
		var offset, i, x, y, color, r, g, b, width, height, ctx
		file.Seek( 3)
		var count = file.GetByte();
		file.Seek( 12)
		var baseOffset = file.GetInt();
		var imgOffset = new Array()
		this._img = new Array;
		
		console.log( baseOffset, count)
		//读取图片偏移列表
		file.Seek( 36)
		for( i = 0; i < count; i ++)
		{
			file.Seek( 4, 'SEEK_CUR')
			imgOffset[ i] = file.GetInt();
			file.Seek( 4, 'SEEK_CUR')
		}	
		//逐个解析到canvas
		for( i = 0; i < count; i ++){
			offset = imgOffset[ i]			
			ctx = this._img[ i] = document.createElement('Canvas').getContext('2d')
			
			file.Seek( offset + baseOffset + 6)
			width = ctx.canvas.width = file.GetInt()
			height = ctx.canvas.height = file.GetInt()
			
			//console.log( offset, width, height)
			file.Seek( 10, 'SEEK_CUR')
			//lib的颜色信息顺序是从左上到右下
			for( y = 0; y < height; y++)
				for( x = 0; x < width; x++){
					
					color = file.GetWord();
					b = ( color & 0x1f) * 8
					g = ( ( color >> 5) & 0x3f ) * 4
					r = ( color >> 11) * 8
					
					ctx.pixel( x, y, 'rgb('+ r + ','+ g + ',' + b +')')
					}

			}

		} ,
	//加载Lib文件
	LoadLib : function( path){
		var file = new VirtualFile;
			if( !file.LoadByURL( path))
				alert( '文件加载错误');
		
		var offset, i, x, y, color, r, g, b, width, height, ctx
		var count = file.GetInt();
		var imgOffset = new Array()
		this._img = new Array;
		//读取图片偏移列表
		for( i = 0; i < count; i ++)
			imgOffset[ i] = file.GetInt();
		//逐个解析到canvas
		for( i = 0; i < count; i ++){
			offset = imgOffset[ i]
			file.Seek( offset + 4)
			ctx = this._img[ i] = document.createElement('Canvas').getContext('2d')
			
			width = ctx.canvas.width = file.GetWord()
			height = ctx.canvas.height = file.GetWord()
			
			file.Seek( offset + 16)
			//lib的颜色信息顺序是从左上到右下
			for( y = 0; y < height; y++)
				for( x = 0; x < width; x++){
					
					color = file.GetWord();
					b = ( color & 0x1f) * 8
					g = ( ( color >> 5) & 0x3f ) * 4
					r = ( color >> 11) * 8
					
					ctx.pixel( x, y, 'rgb('+ r + ','+ g + ',' + b +')')
					}

			}
			
		} ,
	//加载Rlb文件
	LoadRlb : function( path){
		var file = new VirtualFile;
			if( !file.LoadByURL( path))
				alert( '文件加载错误');
			
		var offset, i, x, y,width, height, ctx, r, g, b, imageData, color, supplement//bmp的补足
		var count = file.GetInt();
		var imgOffset = new Array()
		this._img = new Array;
		//读取图片偏移列表
		for( i = 0; i < count; i ++)
			imgOffset[ i] = file.GetInt();
		//逐个解析到canvas
		//这里是解析Rlb中的简单bmp 没有考虑什么ImageDataOffset之类的
		for( i = 0; i < count; i ++)
		{
			offset = imgOffset[ i]
			file.Seek( offset + 22)
			ctx = this._img[ i] = document.createElement('Canvas').getContext('2d');
			
			width = ctx.canvas.width = file.GetInt()
			height = ctx.canvas.height = file.GetInt()
			supplement = width * 3 % 4
			imageData = { width : width, height : height, data : new Array};
			
			file.Seek( offset + 58)
			//lib的颜色信息顺序是从左上到右下
			for( y = 0; y < height; y++)
			{
				for( x = 0; x < width; x++)
				{
					b = file.GetByte();
					g = file.GetByte();
					r = file.GetByte();
					imageData.data.unshift( r, g, b, 255);
				}
				file.Seek( supplement, 'SEEK_CUR')
			}
			
			ctx.putImageData( imageData, 0, 0, 0, 0, width, height)
		}
			
			
		} ,
	//返回图片张数
	Count : function(){ return this._img.length}
	//
	}

