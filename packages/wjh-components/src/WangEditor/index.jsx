/*
 * @Description: WangEditor
 * @Author: 吴锦辉
 * @Date: 2021-10-08 17:14:43
 * @LastEditTime: 2021-10-11 11:29:41
 * @Reference: https://www.wangeditor.com/
 */

import React, { useEffect, useRef } from 'react';
import WangEditor from 'wangeditor';

export default function Editor({ defaultValue = '', height = 300, onChange }) {
  const toolbarRef = useRef(null);
  const contentRef = useRef(null);
  const initValue = useRef(defaultValue);

  useEffect(() => {
    const editor = new WangEditor(toolbarRef.current, contentRef.current);

    editor.customConfig.onchange = html => {
      onChange && onChange(html);
    };

    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'video', // 插入视频
      'code', // 插入代码
      'undo', // 撤销
      'redo', // 重复
    ];

    // editor.customConfig.uploadImgShowBase64 = true;
    editor.customConfig.uploadImgServer = '/upload';

    editor.customConfig.customUploadImg = (files, insert) => {
      console.log(files, insert);
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      // api.uploadFile(files[0], 'course', {
      //   onError(e) {},
      //   onSuccess(e) {
      //     insert(e.url);
      //   },
      //   onProgress(percent) {},
      // });
    };

    editor.create();

    editor.txt.html(initValue.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={toolbarRef} />
      <div ref={contentRef} style={{ height: `${height}px` }} />
    </div>
  );
}
