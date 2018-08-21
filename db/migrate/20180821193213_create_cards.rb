class CreateCards < ActiveRecord::Migration[5.2]
  def change
    create_table :cards do |t|
      t.references :quiz, foreign_key: true
      t.string :word
      t.text :definition

      t.timestamps
    end
  end
end
