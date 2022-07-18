import getSignedPath from './get-signed-path';

describe('getSignedPath', () => {
  it('should return valid signed path', () => {
    const signedPath = getSignedPath('1234', '/foo', { z: 2, a: 1 });

    expect(signedPath).toContain('/foo?a=1&z=2&signed=');
  });
});
