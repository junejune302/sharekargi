class AddAlldayToEvent < ActiveRecord::Migration
  def change
    add_column :events, :allday, :string
  end
end
