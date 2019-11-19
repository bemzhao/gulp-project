{
    let s='𠮷';
    //es5
    console.log('length',s.length);//2 （码字大于两个字节，当四个字节处理，计算长度的时候每两个字节算一个长度）
    console.log('0',s.charAt(0));//0 乱码
    console.log('0',s.charAt(2));//0 乱码
    console.log('at0',s.charCodeAt(0));//at0 55362
    console.log('at1',s.charCodeAt(1));//at0 57271
    //es6
    let s1='𠮷a';
    console.log('length',s1.length);//3
    console.log('code0',s1.codePointAt(0));//134071 取出4个字节
    console.log('code0',s1.codePointAt(0).toString(16));//20bb7
    console.log('code1',s1.codePointAt(1));//57271 取出后两个字节
    console.log('code1',s1.codePointAt(2));//97 就是a
    //.toString(16)转成16进制
}

(() => {
    console.log("success")
})