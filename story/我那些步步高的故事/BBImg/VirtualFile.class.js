//说明：这是一个虚拟文件的类 VirtualFile,文件数据可以用XMLHttpRequest来读取或者从字符串读取，提供基本的文件操作接口
//参数说明：参数前有'—'的不是必选参数
function VirtualFile(_sDataString, _iLoadLength) {
    this.offset = 0;
    this.status = 0;
    this.BigEndian(false);

    if (typeof _sDataString != 'undefined')
        return this.LoadByData(_sDataString, _iLoadLength);
}
//load file by a string data
VirtualFile.prototype = {
    LoadByData: function(sDataString, _iLoadLength) {
        //if( typeof( sDataString) == 'undefined')
        //	return false;
        //每次加载都是新的数组
        this.data = new Array();

        var len = sDataString.length;

        if (typeof _iLoadLength != 'undefined')
            len = Math.min(len, _iLoadLength);

        var p = 0;
        for (var i = 0; i < len; i++) {
            code = sDataString.charCodeAt(i);
            //对是否是汉字的判断
            if (code > 0x7f) {
                //使用encodeURI得出汉字的正确编码
                codeArray = encodeURI(sDataString.charAt(i)).split('%');
                codeArrayLen = codeArray.length;
                for (j = 1; j < codeArrayLen; j++)
                    this.data[p++] = ('0x' + codeArray[j]) * 1;
            } else this.data[p++] = code;
        }
        return this;
    },
    //load filr by a url use XMLHttpRequest, 非异步
    LoadByURL: function(sDataURL, _iLoadLength) {
        if (window.XMLHttpRequest)
            // code for IE7+, Firefox, Chrome, Opera, Safari
            var xp = new XMLHttpRequest();
        // code for IE6, IE5
        else var xp = new ActiveXObject('Microsoft.XMLHTTP');

        xp.open('GET', sDataURL, false);
        xp.overrideMimeType('text/plain; charset=x-user-defined');

        xp.send();

        if (xp.statusText == 'Not Found') return false;

        sDataString = xp.responseText;
        this.data = null;
        this.data = new Array();

        var len = sDataString.length;

        if (typeof _iLoadLength != 'undefined')
            len = Math.min(len, _iLoadLength);

        for (var i = 0; i < len; i++) {
            this.data[i] = sDataString.charCodeAt(i) & 0xff;
        }
        return true;
    },
    //
    Write: function(sSting, _iWriteLength) {
        var len = sSting.length;

        if (typeof _iWriteLength != 'undefined')
            len = Math.min(len, _iWriteLength);

        for (var i = 0; i < len; i++) {
            this.data[this.offset++] = sSting.charCodeAt(i);
        }
        return this;
    },

    WriteLn: function(sSting, _iLoadLength) {
        return this.Write(sSting + '\n');
    },

    toString: function() {
        var str = new Array();
        var len = this.data.length;
        for (var i = 0; i < len; i++)
            str[i] = String.fromCharCode(this.data[i]);
        return str.join('');
    },

    Seek: function(iOffset, _sWhence) {
        var maxOffset = this.Size();

        switch (_sWhence) {
            case 'SEEK_SET':
                this.offset = iOffset;
                break;
            case 'SEEK_CUR':
                this.offset += iOffset;
                break;
            case 'SEEK_END':
                this.offset = maxOffset - iOffset;
                break;
            default:
                this.offset = iOffset;
        }

        if (this.offset < 0) this.offset = 0;
        else if (this.offset > maxOffset) this.offset = maxOffset;
        return this;
    },

    Size: function() {
        return this.data.length;
    },

    //获取和设置BigEndian状态
    BigEndian: function(_bBool) {
        if (typeof _bBool == 'undefined') return this._bigendian;
        if (_bBool) {
            this.GetInt = VirtualFile.prototype.GetInt_BigEndian;
            this.PutInt = VirtualFile.prototype.PutInt_BigEndian;

            this.GetWord = VirtualFile.prototype.GetWord_BigEndian;
            this.PutWord = VirtualFile.prototype.PutWord_BigEndian;
        } else {
            this.GetInt = VirtualFile.prototype.GetInt_LittleEndian;
            this.PutInt = VirtualFile.prototype.PutInt_LittleEndian;

            this.GetWord = VirtualFile.prototype.GetWord_LittleEndian;
            this.PutWord = VirtualFile.prototype.PutWord_LittleEndian;
        }

        this._bigendian = _bBool;
        return this;
    },
    //多种读取和写入模式
    GetInt_BigEndian: function() {
        return (
            (this.data[this.offset++] << 24) |
            (this.data[this.offset++] << 16) |
            (this.data[this.offset++] << 8) |
            this.data[this.offset++]
        );
    },

    GetInt_LittleEndian: function() {
        return (
            this.data[this.offset++] |
            (this.data[this.offset++] << 8) |
            (this.data[this.offset++] << 16) |
            (this.data[this.offset++] << 24)
        );
    },

    PutInt_BigEndian: function(iInt) {
        this.data[this.offset++] = iInt >> 24;
        this.data[this.offset++] = (iInt >> 16) & 0xff;
        this.data[this.offset++] = (iInt >> 8) & 0xff;
        this.data[this.offset++] = iInt & 0xff;
        return this;
    },

    PutInt_LittleEndian: function(iInt) {
        this.data[this.offset++] = iInt & 0xff;
        this.data[this.offset++] = (iInt >> 8) & 0xff;
        this.data[this.offset++] = (iInt >> 16) & 0xff;
        this.data[this.offset++] = iInt >> 24;
        return this;
    },

    GetWord_BigEndian: function() {
        return (this.data[this.offset++] << 8) | this.data[this.offset++];
    },

    PutWord_BigEndian: function(wWord) {
        this.data[this.offset++] = (wWord >> 8) & 0xff00;
        this.data[this.offset++] = wWord & 0xff;
        return this;
    },

    GetWord_LittleEndian: function() {
        return this.data[this.offset++] | (this.data[this.offset++] << 8);
    },

    PutWord_LittleEndian: function(wWord) {
        this.data[this.offset++] = wWord & 0xff;
        this.data[this.offset++] = (wWord >> 8) & 0xff00;
        return this;
    },

    //VirtualFile.prototype.GetInt = VirtualFile.prototype.GetInt_LittleEndian

    //VirtualFile.prototype.GetWord = VirtualFile.prototype.GetWord_LittleEndian

    GetByte: function() {
        return this.data[this.offset++];
    },

    //VirtualFile.prototype.PutInt = VirtualFile.prototype.PutInt_LittleEndian

    //VirtualFile.prototype.PutWord = VirtualFile.prototype.PutWord_LittleEndian

    PutByte: function(bData) {
        this.data[this.offset++] = bData & 0xff;
        return this;
    },
    //返回String ,若无_iLength则等同于toString
    Get: function(_iLength) {
        var len = this.data.length;
        if (typeof _iLength != 'undefined') len = Math.min(len, _iLength);

        for (var i = 0; i < len; i++)
            str[i] = String.fromCharCode(this.data[i]);
        return str.join('');
    },
    //同名函数等同于Write
    Put: function(sDataString, _iLength) {
        return this.Write(sDataString, _iLength);
    },
};
VirtualFile.prototype.GetFloat;

VirtualFile.prototype.PutFloat;
