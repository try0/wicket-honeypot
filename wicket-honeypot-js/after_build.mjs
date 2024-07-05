import { copyFile } from 'fs/promises';
import { join } from 'path';

// ソースファイルとコピー先のパスを指定
const sourceFilePath = join(process.cwd(), 'dist', 'HoneypotBehavior.umd.cjs');
const destinationFilePath = join(process.cwd(), '../wicket-honeypot-core/src/main/java/jp/try0/wicket/honeypot/behavior', 'HoneypotBehavior.min.js');

// コピーする関数
async function copyFileAsync(source, destination) {
  try {
    await copyFile(source, destination);
    console.log('ファイルのコピーが成功しました:', destination);
  } catch (err) {
    console.error('ファイルのコピーに失敗しました:', err);
  }
}

// コピーを実行
copyFileAsync(sourceFilePath, destinationFilePath);