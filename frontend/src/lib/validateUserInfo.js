export const maxLen = 30;
export const minLen = 10;
export const maxComplainContextLen = 300;

export const WarningMessage = {
  InvalidEmail: '유효하지 않은 이메입니다',
  EmptyEmail: '이메일을 입력해 주세요',
  InvalidPassword: '비밀번호는 8자리 이상, 특수문자, 숫자, 알파벳을 포함해야 합니다',
  EmptyPassword: '비밀번호를 입력해 주세요',
  VerifyPasswordNotEqual: '비밀번호와 일치하지 않습니다',
  VerifyNewPasswordNotEqual: '새로운 비밀번호와 일치하지 않습니다',
  MaxLen: `${maxLen}이하여야 합니다`,
  EmptySubwayLine: '지하철 호선을 선택해 주세요',
  InvalidSubwayLine: '지하철 호선이 잘못되었습니다',
  EmptyComplainContext: '민원 내용이 비어있습니다',
  ComplainContextIsTooShort: '민원 내용은 10글자 이상이여야 합니다',
  ComplainContextIsTooLong: '민원 내용은 300글자 미만이여야 합니다',
}
Object.freeze(WarningMessage);

export const RegExp = {
  Email: /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i,
  Password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%^*#?&])[A-Za-z\d$@$!%^*#?&]{8,}$/,
  SubwayLine: /[1-9]/,
}
Object.freeze(RegExp);