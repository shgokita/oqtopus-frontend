export default {
  list: {
    title: 'ジョブ',
    register_button: '新規でジョブを登録する',
    search: {
      head: 'ジョブ検索',
      job_search_query_input: 'ジョブID、ジョブ名もしくはジョブ詳細',
      job_search_query_input_placeholder: 'Enter Job ID, Job Name or Job Description',
      status: 'ステータス',
      description: '説明',
      description_placeholder: 'Enter description',
      button: '検索',
    },
    table: {
      id: 'ジョブID',
      name: 'ジョブ名',
      device: 'デバイスID',
      status: 'ステータス',
      date: 'Submit 日時',
      operation: '操作',
      delete_button: '削除',
    },
    operation: {
      delete: '削除',
      cancel: 'キャンセル',
    },
    modal: {
      title: '確認',
      delete: 'ジョブを削除します。よろしいでしょうか？',
      bulk_delete: '選択したジョブを一括削除します。よろしいでしょうか？',
      cancel: 'ジョブをキャンセルします。よろしいでしょうか？',
    },
    nodata: '表示するジョブがありません。',
    delete_selected: '一括削除',
    delete_in_progress: '一括削除進行中...',
    cancel_selected: '一括キャンセル',
    cancel_in_progress: '一括キャンセル進行中...',
  },
  detail: {
    title: 'ジョブ詳細',
    description:
      '実行日時、終了日時、実行時間、Transpiled Program、Result等の欄はジョブ処理時に反映されます。',
    not_found: '対象のジョブが存在しません。',
    reload: '再読み込み',
    info: {
      head: '基本情報',
      item: '項目',
      id: 'ジョブID',
      name: 'ジョブ名',
      description: '説明',
      job_type: 'ジョブタイプ',
      device_id: 'デバイスID',
      shots: 'ショット数',
      status: 'ステータス',
      submitted_at: 'Submit 日時',
      ready_at: 'Ready 日時',
      running_at: '実行日時',
      ended_at: '終了日時',
      execution_time: '実行時間 (秒)',
      message: 'メッセージ',
    },
    program: {
      nodata: 'データが存在しません',
    },
    transpiled_program: {
      nodata: 'データが存在しません',
    },
    transpile_result: {
      nodata: 'データが存在しません',
    },
    result: {
      nodata: 'データが存在しません',
    },
    histogram: {
      nodata: 'データが存在しません',
    },
    transpiler_info: {
      nodata: 'データが存在しません',
    },
    mitigation_info: {
      nodata: 'データが存在しません',
    },
    expectation: {
      nodata: 'データが存在しません',
    },
    sselog: {
      head: 'SSE ログ',
      button: 'Log ダウンロード',
    },
    text: {
      copied: 'コピーしました',
      copy_tooltip: 'クリップボードにコピー',
    },
  },
  form: {
    title: 'Job入力フォーム',
    description: '量子デバイスで実行するジョブを登録できます',
    name_placeholder: '例）〇〇〇',
    description_placeholder: '例）〇〇〇',
    program_placeholder:
      '例）OPENQASM 3; include "stdgates.inc"; qubit[2] q; bit[2] c; h q[0]; cnot q[0], q[1]; c = measure q;',
    operator_pauli_placeholder: '演算子のパウリ文字列 (例: X 0 X 1)',
    operator_coeff_placeholder: '演算子の係数を入力 (例: 1.5)',
    transpiler_placeholder: '例）{}',
    simulator_placeholder: '例）{}',
    mitigation_placeholder: '例）{}',
    shots_placeholder: '例）4',
    upload_file_button: 'ファイル読み込み',
    button: '送信する',
    submit_and_view_job_button: '送信して詳細を確認',
    submitting: 'リクエストを処理中...',
    toast: {
      success: '成功: ジョブが正常に送信されました',
      error: '失敗: ジョブの送信に失敗しました',
    },
    error_message: {
      name: 'Job名を入力してください',
      shots: '正のショット数を入力してください',
      device: 'デバイスを選択してください',
      type: 'ジョブタイプを選択してください',
      program: 'プログラムを入力してください',
      operator: {
        pauli_required: 'Pauliフィールドは必須です',
        pauli_match: 'Pauliフィールドでは I、X、Y、Z、および数字の0-9のみが許可されています',
        pauli_empty: 'Pauliフィールドを空にすることはできません',
        coeff_required: '係数フィールドは必須です',
      },
      invalid_json: '正しいJSON形式で入力してください',
    },
  },
};
