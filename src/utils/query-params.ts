export const isScalar = (value: any) => {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'boolean';
};

/**
 * Scalar arrays go on the wire comma-separated (`ids=a,b`), anything else has
 * to be JSON or it stringifies to `[object Object]`. `null` and `undefined`
 * entries are dropped so that a single empty value can't flip the format.
 */
export const stringifyArrayParam = (param: any[]) => {
  const entries = [];
  let allScalar = true;
  for (const entry of param) {
    if (entry == null) continue;
    if (!isScalar(entry)) allScalar = false;
    entries.push(entry);
  }

  return allScalar ? entries.join(',') : JSON.stringify(entries);
};
