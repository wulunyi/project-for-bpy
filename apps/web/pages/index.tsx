import { useState } from "react";
import { Button } from "ui";
import { readExcel, Sheet } from "../utils/readExcel";

export default function Web() {
  const [key, setKey] = useState(0);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<Sheet[]>([]);

  return (
    <div>
      {reading && <div>数据读取中，可能需要一段时间，请耐心等待</div>}
      {error && <div>数据获取失败</div>}
      <input key={key} placeholder="请选择 Excel 文件" type={"file"} onChange={async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
          setData([]);
          setReading(true);
          setError(false);
          const data = await readExcel(file);
          setData(data);
        } catch (error) {
          console.error(error);
          setError(true);
        } finally {
          setReading(false);
          setKey((pre) => pre +1);
        }
      }}/>
      {data.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
}
