export const cnabFileStub = () => {
  return {
    fieldname: 'file',
    originalname: 'CNAB.cnab',
    encoding: '7bit',
    mimetype: 'application/octet-stream',
    buffer: new Buffer('test'),
    size: 1584,
  };
};
