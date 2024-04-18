const ADMIN_UID =
  process.env.REACT_APP_ADMIN_UID ?? 'bpKgzLJPBpb2xzsZdlH4YFIttla2';

export const Admin = (uid: string) => uid === ADMIN_UID;

console.log("Admin ==> ", Admin);
