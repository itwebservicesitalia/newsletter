/**
 * If fulfilled
 * {
      status: 'fulfilled',
      value: {
        accepted: [Array],
        rejected: [],
        envelopeTime: 139,
        messageTime: 64,
        messageSize: 2112,
        response: '250 Accepted [STATUS=new MSGID=X7--vHOUYS42YaxIX7.CCEBf5S6uTMiYAAAQSBI2C7DJX9p9OmRCDSoZ2fQ]',
        envelope: [Object],
        messageId: '<ec482ab3-2433-6942-28ab-f3ae7b376b03@rex.ch>'
      }
    }
    If rejected
    {
    status: 'rejected',
    reason: Error: queryA ETIMEOUT smtp.ethereal.email
        at QueryReqWrap.onresolve [as oncomplete] (node:dns:203:19) {
      errno: undefined,
      code: 'EDNS',
      syscall: 'queryA',
      hostname: 'smtp.ethereal.email',
      command: 'CONN'
    }
  }
 */
