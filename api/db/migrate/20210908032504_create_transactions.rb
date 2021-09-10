class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.string :type_transaction
      t.string :coin_send
      t.string :coin_receive
      t.decimal :total_send
      t.decimal :total_receive

      t.timestamps
    end
  end
end
