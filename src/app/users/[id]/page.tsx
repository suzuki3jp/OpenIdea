export default function ({ params }: PageProps<"/users/[id]">) {
  // サーバー用の supabase のクライアントを init して、ユーザー情報を取得する
  // 取得したユーザー情報が [id] と一致する場合にのみ、購入履歴とか本人しか見れない情報を表示する
  // 違う or ログインしていない場合は、フォローとか一般公開情報のみ表示する
  // ログインしていない場合は フォローボタンは リンクになっていて、ログインページに飛ばす
  // profile-header.tsx, profile-body.tsx などを呼ぶ
}
