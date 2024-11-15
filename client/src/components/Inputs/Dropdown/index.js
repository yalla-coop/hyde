import { useState } from 'react';
import { Select as AntdSelect } from 'antd';
import { css } from '@emotion/react';

import * as T from '../../Typography';
import * as S from './style';
import * as CS from './../style';
import Icon from '../../Icon';

const { OptGroup: AntdOptGroup, Option: AntdOption } = AntdSelect;

const Dropdown = ({
  handleChange,
  label,
  color,
  placeholder = 'Select...',
  error,
  helper,
  w,
  disabled,
  options = [],
  groupedOptions,
  selected,
  multi,
  m,
  search,
  addNew,
  optional,
  customFont,
  allowClear = true,
}) => {
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);

  const decideColor = () => {
    if (error) return 'error';
    return color;
  };

  const isSelected = (option) =>
    selected === option || (selected && selected.toString().includes(option));

  const renderOptions = () => {
    if (groupedOptions) {
      return options.map(({ groupLabel, options: _options }) => (
        <AntdOptGroup
          label={
            <T.P color={color} m="0" mb="2">
              {label}
            </T.P>
          }
          key={groupLabel}
        >
          {_options.map((opt) => (
            <AntdOption
              className={css`
                ${S.OptionStyle}
              `}
              key={`${groupLabel}_${opt.label}`}
              value={opt.value}
              points={opt.points}
              isSelected={isSelected(opt.value)}
              {...options}
            >
              {opt.label}
            </AntdOption>
          ))}
        </AntdOptGroup>
      ));
    }
    return options.map((options) => {
      const { value: _value, label: _label } = options;
      return (
        <AntdOption
          className={css`
            ${S.OptionStyle}
          `}
          style={{ fontFamily: customFont ? _value : 'inherit' }}
          key={_value}
          value={_value}
          label={_label}
          {...options}
        >
          {_label}
        </AntdOption>
      );
    });
  };

  const handleSearch = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const decideMode = () => {
    if (addNew) return 'tags';
    if (multi) return 'multiple';
    return;
  };

  return (
    <S.Field
      w={w}
      disabled={disabled}
      open={open}
      focus={focus}
      multi={multi}
      color={decideColor()}
      error={error}
      search={search}
      {...m}
    >
      {label && (
        <CS.Label htmlFor={label} mb={helper ? '1' : '2'}>
          <T.H3 color={color} m="0">
            {label}
          </T.H3>
          {optional && <CS.OptionalTag ml="1">(optional)</CS.OptionalTag>}
        </CS.Label>
      )}
      {helper && (
        <T.P isSmall color="neutralDark" mb="2">
          {helper}
        </T.P>
      )}
      <S.Answer>
        <AntdSelect
          value={selected || undefined}
          onSelect={(val, option) =>
            multi ? undefined : handleChange(val, option)
          }
          onChange={(val, option) =>
            multi ? handleChange(val, option) : undefined
          }
          mode={decideMode()}
          placeholder={placeholder || 'Type here...'}
          showArrow
          allowClear={allowClear}
          onDropdownVisibleChange={(open) => setOpen(open)}
          dropdownStyle={S.menuStyle}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          filterOption={addNew || handleSearch}
          suffixIcon={
            search ? (
              <Icon icon="search" width="24" height="24" color="black" />
            ) : (
              <Icon icon="arrowDown" width="12" height="6" />
            )
          }
          showSearch={addNew || search}
          aria-label={label}
          aria-expanded={open}
        >
          {renderOptions()}
        </AntdSelect>
      </S.Answer>
      {error && (
        <T.P color="error" m="0" mt="1">
          {error}
        </T.P>
      )}
    </S.Field>
  );
};

export default Dropdown;
